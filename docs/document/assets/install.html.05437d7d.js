import{r as e,o,c as n,a as l,F as t,b as r}from"./app.5006f96c.js";const s={},a=l("h1",{id:"安装"},[l("a",{class:"header-anchor",href:"#安装"},"#"),r(" 安装")],-1),u=l("h2",{id:"下载程序"},[l("a",{class:"header-anchor",href:"#下载程序"},"#"),r(" 下载程序")],-1),c=l("li",null,[r("在"),l("a",{href:"#"},"官网"),r("下载 📦 "),l("strong",null,"BookMate 压缩包"),r("（如果从 Github 下载速度较慢，可以切换 "),l("code",null,"Gitee"),r(" 或 "),l("code",null,"坚果云"),r(" 下载源） "),l("img",{src:"/bookmate/document/images/screenshots/download_source.png",alt:"download source"})],-1),m=r("在 "),i={href:"https://www.mongodb.com/try/download/community",target:"_blank",rel:"noopener noreferrer"},g=r("MongoDB 官网"),d=r("下载安装包 "),b=l("img",{src:"/bookmate/document/images/screenshots/download_mongodb.png",alt:"download mongodb"},null,-1),k=l("h2",{id:"安装程序"},[l("a",{class:"header-anchor",href:"#安装程序"},"#"),r(" 安装程序")],-1),p=l("p",null,[r("压缩包解压后有两个文件夹 📁 "),l("code",null,"BookMate-Client"),r(" 和 📁 "),l("code",null,"BookMate-Server"),r(" ，分别与客户端和服务端相关")],-1),h=l("li",null,[r("📁 BookMate-Client "),l("ul",null,[l("li",null,[r("可以运行程序 💾 "),l("strong",null,[l("code",null,"bookmate-client Setup")]),r(" 进行安装 "),l("img",{src:"/bookmate/document/images/screenshots/install_bookmate_client.png",alt:"bookmate-client setup"})]),l("li",null,[r("也可以不安装，直接使用未打包的文件夹 📁 "),l("strong",null,[l("code",null,"bookmate-client-unpacked")]),l("img",{src:"/bookmate/document/images/screenshots/unpack_bookmate_client.png",alt:"bookmate unpack"})])])],-1),_=l("li",null,[r("📁 BookMate-Client "),l("ul",null,[l("li",null,[r("服务端"),l("strong",null,"不"),r("需要安装，程序 💾 "),l("strong",null,[l("code",null,"bookmate-server")]),r(" 就是服务端程序")]),l("li",null,[r("文件夹 📁 "),l("strong",null,[l("code",null,"public")]),r(" 用于存放用户上传的图片、视频等数据 "),l("img",{src:"/bookmate/document/images/screenshots/bookmate_server.png",alt:"bookmate-server"}),r(" ⚠️ 文件夹 📁 "),l("code",null,"public"),r(" 需要和程序 💾 "),l("code",null,"bookmate-server"),r(" 存放在"),l("strong",null,"同一级目录"),r("下")])])],-1),f=r("💾 MongoDB 是一款开源的数据库，其的安装请参考"),B={href:"https://docs.mongodb.com/guides/server/install/",target:"_blank",rel:"noopener noreferrer"},v=r("官方文档"),M=l("img",{src:"/bookmate/document/images/screenshots/install_mongodb_1.png",alt:"install mongodb setup step 1"},null,-1),w=l("img",{src:"/bookmate/document/images/screenshots/install_mongodb_2.png",alt:"install mongodb setup step 2"},null,-1),D=l("img",{src:"/bookmate/document/images/screenshots/install_mongodb_3.png",alt:"install mongodb setup step 3"},null,-1),E={id:"运行程序"},C=l("a",{class:"header-anchor",href:"#运行程序"},"#",-1),S=r(" 运行程序 "),A={href:"https://user-images.githubusercontent.com/40909550/120360732-aa257380-c33b-11eb-9e44-81bf8854c167.mp4",target:"_blank",rel:"noopener noreferrer"},F=r("🎥"),y=r(),G={href:"https://www.bilibili.com/video/BV1sv411V7tE",target:"_blank",rel:"noopener noreferrer"},V=r("📺"),j=l("p",null,[r("由于 BookMate 采用前后端分离的设计，因此需要依此启动 "),l("strong",null,"MongoDB"),r("、"),l("strong",null,"BookMate-Server"),r("、"),l("strong",null,"BookMate-Client"),r(" 程序。")],-1),x=r("MongoDB 程序启动方法参考"),L={href:"https://docs.mongodb.com/guides/server/install/#run-mongodb",target:"_blank",rel:"noopener noreferrer"},N=r("官方文档"),O=l("img",{src:"/bookmate/document/images/screenshots/run_mongodb.png",alt:"run mongodb"},null,-1),R=r(" 💡 "),q=l("a",{href:"#%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F"},"安装",-1),z=r(" MongoDB 时如果选择 "),H=l("code",null,"Run service as Network Service user",-1),I=r("，则 MongoDB 会在开机时自动运行，不需要每次手动开启"),J=l("li",null,[r("BookMate-Server：运行 💾 "),l("strong",null,[l("code",null,"bookmate-server"),r(" 程序")]),r("启动服务端 "),l("img",{src:"/bookmate/document/images/screenshots/run_bookmate_server.png",alt:"run bookmate-server"})],-1),K=l("li",null,[r("BookMate-Client：运行 💾 "),l("strong",null,[l("code",null,"bookmate-client"),r(" 程序")]),r("启动客户端 "),l("img",{src:"/bookmate/document/images/screenshots/run_bookmate_client.png",alt:"run bookmate-client"})],-1),P=l("p",null,[r("💡 如果客户端界面无法加载数据，可以按 "),l("code",null,"F5"),r(" 快捷键刷新页面；如果刷新后仍未成功加载数据，在开启数据库 MongoDB 的前提下，可以尝试重启 💾 "),l("strong",null,[l("code",null,"bookmate-server"),r(" 程序")]),r("，再按 "),l("code",null,"F5"),r(" 快捷键刷新客户端")],-1);s.render=function(r,s){const Q=e("OutboundLink");return o(),n(t,null,[a,u,l("ul",null,[c,l("li",null,[m,l("a",i,[g,l(Q)]),d,b])]),k,p,l("ul",null,[h,_,l("li",null,[f,l("a",B,[v,l(Q)]),M,w,D])]),l("h2",E,[C,S,l("a",A,[F,l(Q)]),y,l("a",G,[V,l(Q)])]),j,l("ul",null,[l("li",null,[x,l("a",L,[N,l(Q)]),O,R,q,z,H,I]),J,K]),P],64)};export default s;
