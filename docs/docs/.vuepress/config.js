module.exports = {
  base: '/',
  lang: 'zh-CN',
  title: 'BookMate 说明文档',
  description: 'BookMate 说明文档',
  bundler: '@vuepress/vite',
  bundlerConfig: {
    // vite 打包工具的选项
  },
  theme: '@vuepress/default',
  themeConfig: {
    logo: '/images/BookMate.png',
    navbar: [
      {
        text: '使用指南',
        link: '/user/'
      },
      {
        text: '开发指南',
        link: '/developer/'
      }
    ],
    repo: 'https://github.com/Benbinbin',
    repoLabel: 'Github'
  },
}