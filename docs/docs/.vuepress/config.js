module.exports = {
  base: '/bookmate/',
  lang: 'zh-CN',
  title: 'BookMate',
  description: 'BookMate 说明文档',
  head: [['link', { rel: 'icon', href: '../images/favicon.ico' }]],
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
        link: '/user/introduction.md'
      },
      {
        text: '开发日志',
        link: '/dev/introduction.md'
      }
    ],
    repo: 'https://github.com/Benbinbin',
    repoLabel: 'Github',
    sidebar: {
      '/user/': [
        {
          isGroup: true,
          text: '使用指南',
          children: [
            '/user/introduction.md',
            '/user/install.md',
            '/user/interface.md',
            '/user/book.md',
            '/user/quote.md',
            '/user/summary.md',
            '/user/share.md',
            '/user/pin.md',
            '/user/backup.md'
          ]
        }
      ],
      '/dev/': [
        {
          isGroup: true,
          text: '开发日志',
          children: [
            '/dev/introduction.md',
          ]
        }
      ]
    }
  },
}