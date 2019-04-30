const { dialog, ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql')
const { exec, spawn } = require('child_process')
const iconv = require('iconv-lite')
const encoding = 'cp936'
const binaryEncoding = 'binary'

ipcMain.on('open-directory-dialog', (event, args) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (directory) {
    if (directory) {
      event.sender.send('selected-directory', { directory: directory, args: args })
    }
  })
})

ipcMain.on('open-file-dialog', (event, args) => {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function (files) {
    if (files) {
      event.sender.send('selected-file', { files: files, args: args })
    }
  })
})

ipcMain.on('save-file-dialog', (event, args) => {
  dialog.showSaveDialog(args || {}, function (filename) {
    if (filename) {
      event.sender.send('saved-file', { filename: filename, args: args })
    }
  })
})

ipcMain.on('get-mysql-data', (event, args) => {
  if (!args.hasOwnProperty('mysql_config')) {
    if (global.sharedObject.hasOwnProperty('mysql_config')) {
      args['mysql_config'] = global.sharedObject.mysql_config
    } else {
      return
    }
  }
  let connection = mysql.createConnection(args.mysql_config)
  connection.connect(function (error) {
    if (error) {
      connection.end()
      console.error(error)
      event.returnValue = error
    } else {
      if (!args.query) {
        connection.end()
        event.returnValue = 'no query exec'
      } else {
        connection.query(args.query, function (error, data) {
          if (error) {
            console.error(error)
            event.returnValue = error
          } else {
            event.returnValue = data
          }
          connection.end()
        })
      }
    }
  })
})

ipcMain.on('get-mysql-data-49', (event, args) => {
  if (!args.hasOwnProperty('mysql_config')) {
    if (global.sharedObject.hasOwnProperty('mysql_config')) {
      args['mysql_config'] = global.sharedObject.mysql_config
    } else {
      return
    }
  }
  let connection = mysql.createConnection(args.mysql_config)
  connection.connect(function (error) {
    if (error) {
      connection.end()
      console.error(error)
      event.returnValue = error
    } else {
      if (!args.query) {
        connection.end()
        event.returnValue = 'no query exec'
      } else {
        connection.query(args.query, function (error, data) {
          if (error) {
            console.error(error)
            event.returnValue = error
          } else {
            event.returnValue = data
          }
          connection.end()
        })
      }
    }
  })
})

ipcMain.on('exec', (event, args) => {
  if (!args) {
    event.sender.send('no command exec')
  } else {
    exec(args, { encoding: binaryEncoding }, function (error, stdOut, stdErr) {
      stdOut = iconv.decode(new Buffer(stdOut, binaryEncoding), encoding)
      stdErr = iconv.decode(new Buffer(stdErr, binaryEncoding), encoding)
      if (error) {
        console.error(error, stdErr)
        event.returnValue = stdErr
      } else {
        event.returnValue = stdOut
      }
    })
  }
})

ipcMain.on('exec-bat', function (event, bat) {
  if (!bat) {
    event.sender.send('no command exec')
  } else {
    let child = spawn(bat, [], { encoding: binaryEncoding, cwd: path.dirname(bat) })
    let output = ''
    child.stdout.on('data', function (data) {
      data = iconv.decode(new Buffer(data, binaryEncoding), encoding)
      if (data.indexOf('请按任意键继续. . .') >= 0) {
        child.stdin.write('\n')
      }
      output += data
    })
    child.stderr.on('data', function (data) {
      data = iconv.decode(new Buffer(data, binaryEncoding), encoding)
      console.log('stderr: ' + data)
    })
    child.on('close', function (code) {
      console.log('closing code: ' + code)
      event.sender.send('exec-bat-reply', output)
    })
  }
})

ipcMain.on('excel-to-python', (event, args) => {
  if (!args) {
    event.sender.send('no command exec')
  } else {
    args = args.split(';')
    let script = args[0]
    let child = spawn(script, [], { cwd: path.dirname(script) })
    if (args.length > 1) {
      if (args[1] === '1') {
        console.log('commit py')
        child.stdin.write('\n')
        child.stdin.end()
      } else {
        console.log('just local test py')
        child.stdin.write('0\n')
        child.stdin.end()
      }
    }
    child.on('exit', function (code, signal) {
      console.log('excel-to-python child process exited with ' + `code ${code} and signal ${signal}`)
      event.returnValue = 0
      child = null
    })
    setTimeout(function () {
      if (child) {
        child.exit(0)
      }
    }, 5000)
  }
})

ipcMain.on('exec-with-exit-code', (event, args) => {
  if (!args) {
    event.sender.send('no command exec')
  } else {
    exec(args, { encoding: binaryEncoding }, function (error, stdOut, stdErr) {
      iconv.decode(new Buffer(stdOut, binaryEncoding), encoding)
      iconv.decode(new Buffer(stdErr, binaryEncoding), encoding)
      if (error) {
        console.error(error, stdErr)
      } else {
        console.log(stdOut)
      }
    }).on('exit', function (code) {
      event.returnValue = code
    })
  }
})

ipcMain.on('update-global-object', (event, args) => {
  if (args) {
    try {
      let obj = args
      for (let k in obj) {
        global.sharedObject[k] = JSON.parse(JSON.stringify(obj[k]))
      }
    } catch (e) {
      console.error(e)
    }
  }
})
