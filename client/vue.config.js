const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
      });
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss'],
      alias: {
        styles: path.resolve(__dirname, 'src/assets/scss'),
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "win": {
          "target": [
            "nsis" // 打包成一个独立的 exe 安装程序
          ],
          "signingHashAlgorithms": [
            "sha1",
            "sha256"
          ],
          "icon": "build/icons/icon.png"
        },
        "mac": {  // mac
          "icon": "build/icons/icon.icns"
        },
        "linux": { // linux
          "icon": "build/icons/icon.png"
        },
        "nsis": {
          "oneClick": false, // 是否一键安装
          "perMachine": true, // 安装的时候是否为所有用户安装
          "allowToChangeInstallationDirectory": true, // 是否允许用户改变安装目录， 默认为false
          "deleteAppDataOnUninstall": true, // 是否在卸载时删除应用程序数据
          // 指定要包含 nsis 的脚本，基于内置的nsis脚本进一步扩展
          // for win - 将协议写入主机的脚本
          "include": "urlProtoco.nsh"
        },
        "protocols": [ // for macOS - 用于在主机注册指定协议
          {
            "name": "bookmate",
            "schemes": [
              "bookmate"
            ]
          }
        ]
      }
    }
  }
};
