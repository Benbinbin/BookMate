# 安装

## 下载程序
* 在[官网](#)下载 :package: **BookMate 压缩包**（如果从 Github 下载速度较慢，可以切换 `Gitee` 或 `坚果云` 下载源）
![download source](/images/screenshots/download_source.png)
* 在 [MongoDB 官网](https://www.mongodb.com/try/download/community)下载安装包
![download mongodb](/images/screenshots/download_mongodb.png)


## 安装程序
压缩包解压后有两个文件夹 :file_folder: `BookMate-Client` 和 :file_folder: `BookMate-Server` ，分别与客户端和服务端相关
* :file_folder: BookMate-Client
    * 可以运行程序 :floppy_disk: **`bookmate-client Setup`** 进行安装
    ![bookmate-client setup](/images/screenshots/install_bookmate_client.png)
    * 也可以不安装，直接使用未打包的文件夹 :file_folder: **`bookmate-client-unpacked`**
    ![bookmate unpack](/images/screenshots/unpack_bookmate_client.png)
* :file_folder: BookMate-Client
    * 服务端**不**需要安装，程序 :floppy_disk: **`bookmate-server`** 就是服务端程序
    * 文件夹 :file_folder: **`public`** 用于存放用户上传的图片、视频等数据
    ![bookmate-server](/images/screenshots/bookmate_server.png)
    :warning: 文件夹 :file_folder: `public` 需要和程序 :floppy_disk: `bookmate-server` 存放在**同一级目录**下
* :floppy_disk: MongoDB 是一款开源的数据库，其的安装请参考[官方文档](https://docs.mongodb.com/guides/server/install/)
    ![install mongodb setup step 1](/images/screenshots/install_mongodb_1.png)
    ![install mongodb setup step 2](/images/screenshots/install_mongodb_2.png)
    ![install mongodb setup step 3](/images/screenshots/install_mongodb_3.png)

## 运行程序 [:movie_camera:](https://user-images.githubusercontent.com/40909550/120360732-aa257380-c33b-11eb-9e44-81bf8854c167.mp4) [:tv:](https://www.bilibili.com/video/BV1sv411V7tE)
由于 BookMate 采用前后端分离的设计，因此需要依此启动 **MongoDB**、**BookMate-Server**、**BookMate-Client** 程序。

* MongoDB 程序启动方法参考[官方文档](https://docs.mongodb.com/guides/server/install/#run-mongodb)
    ![run mongodb](/images/screenshots/run_mongodb.png)
    :bulb: [安装](#安装程序) MongoDB 时如果选择 `Run service as Network Service user`，则 MongoDB 会在开机时自动运行，不需要每次手动开启
* BookMate-Server：运行 :floppy_disk: **`bookmate-server` 程序**启动服务端
    ![run bookmate-server](/images/screenshots/run_bookmate_server.png)
* BookMate-Client：运行 :floppy_disk: **`bookmate-client` 程序**启动客户端
    ![run bookmate-client](/images/screenshots/run_bookmate_client.png)

:bulb: 如果客户端界面无法加载数据，可以按 `F5` 快捷键刷新页面；如果刷新后仍未成功加载数据，在开启数据库 MongoDB 的前提下，可以尝试重启 :floppy_disk: **`bookmate-server` 程序**，再按 `F5` 快捷键刷新客户端