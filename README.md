# setup
-npm init
-npm i electron --save-dev -verbose
-npm i electron-packager --save-dev
-npm i mysql -save
-npm i iconv-lite -save

# build and installers
http://ourcodeworld.com/articles/read/365/how-to-create-a-windows-installer-for-an-application-built-with-electron-framework
-npm install electron-winstaller
-npm install electron-squirrel-startup

install package cmd
-node build.js


# some script
-npm run-script start
-npm run-script build
-npm run-script release



# guide
1. 先安装nodejs，https://nodejs.org/en/，下载稳定版并安装
2. cmd切换到工程根目录electron，然后执行 npm install electron --save-dev -verbose
3. 在工程根目录electron，执行npm start启动应用


# intro
-client是我们要编写的应用代码，纯前端，只要写html， js， css即可
-node_modules是node的库文件，一般不用管
-build.js是用来打包成安装文件用的执行脚本
-main.js是工程的主入口
-package.json是工程的描述文件

-build编译出的可执行文件
-installers打包出来安装文件所在目录




# rules
1. 大家自己的子功能页面,直接在client目录下新建html做，如果一个子动能有多个页面，命名规则 appname_funcname.html，如果只有一个就直接appname.html即可；
2. 对应用到的js都放在static/js目录下，命名规则和页面对应，appname_funcname.js，只有一个的话同上，直接appname.js
3. 所有用到的css都直接写到style.css，方便所有页面都缓存，减少资源请求。



# debugging in webstorm
https://blog.jetbrains.com/webstorm/2016/05/getting-started-with-electron-in-webstorm/
1. new a run/debug configurations and new node.js for the app main process with:
    Name: main (or other you want to)
    Node interpreter: .../qatools_table_client/node_modules/.bin/electron.cmd
    JavaScript file: main.js
    Application parameters: --remote-debugging-port=9222
2. new Chromium Remote for the app render with:
    Host: localhost
    Port: 9222
3. choose node.js 'main' to run or debug
(in debug mode you can breakpoint in main process but not for renders)
4. when you run or debug the app. You can press Ctrl+Shift+I to open the developer tools and debugging.


# debugging in vscode
添加一个 .vscode/launch.json 文件并使用以下配置：
`{
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Debug Main Process",
        "type": "node",
        "request": "launch",
        "cwd": "${workspaceRoot}",
        "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
        "windows": {
          "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd"
        },
        "args" : ["."]
      }
    ]
  }`