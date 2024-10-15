import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MakerHu的知识口袋",
  description: "不如学习",
  base: '/notes/',
  head: [['link', { rel: 'icon', href: '/notes/favicon.ico' }]],
  lang: 'zh-CN',
  cleanUrls: true,  // 开启简洁路由地址（无.html后缀）
  lastUpdated: true, // 使用 Git 获取每个页面的最后更新时间戳
  ignoreDeadLinks: true, // 当设置为 true 时，VitePress 不会因为失效链接而导致构建失败
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/logo.png',  // 导航栏站点名前的logo
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',
    outlineTitle: '本章目录',
    externalLinkIcon: true, // 是否在 markdown 中的外部链接旁显示外部链接图标
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 搜索设置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 404 页面
    notFound: {
      title: '页面走丢了',
      quote: '这里什么也没有，换个页面看看吧~',
      linkText: '回到首页'
    },

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '设计模式', link: '/design-pattern/' },
      { text: '问题集', link: '/question-set/' },
      { text: '代码积木', link: '/atomic-tool/' },
      {
        text: '语言',
        items: [
          { text: 'Java', link: '/language/java/' },
          { text: 'Python', link: '/language/python/' }
        ]
      },
      {
        text: '框架学习',
        items: [
          { text: '框架名', link: '/placeholder' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/design-pattern/': [
        { text: '设计模式', link: '/design-pattern/' },
        {
          text: '创建型模式',
          collapsed: false,
          items: [
            {text: '简单工厂模式', link: '/design-pattern/simple-factory'}
          ]
        }
      ],
      '/question-set/': [
        { text: '问题集', link: '/question-set/' },
        {
          text: 'Linux相关',
          collapsed: false,
          items: [
            {text: '防火墙', link: '/question-set/test'}
          ]
        }
      ],
      '/atomic-tool/': [
        { text: '代码积木', link: '/atomic-tool/' },
        {
          text: 'Java',
          collapsed: false,
          items: [
            {text: '子分类1.1', link: '/atomic-tool/java/sub-atrical-one'},
            {text: '子分类1.2', link: '/atomic-tool/java/sub-atrical-two'}
          ]
        },
        {
          text: 'Python',
          collapsed: false,
          items: [
            {text: '子分类2.1', link: '/atomic-tool/python/sub-atrical-one'},
            {text: '子分类2.2', link: '/atomic-tool/python/sub-atrical-two'}
          ]
        }
      ],
      '/language/java/': [
        { text: 'Java', link: '/language/java/' },
        {
          text: 'IO 流',
          collapsed: false,
          items: [
            {text: 'Java 1.1', link: '/language/java/test'},
            {text: 'Java 1.2', link: '/language/java/test'}
          ]
        },
        {
          text: '反射机制',
          collapsed: false,
          items: [
            {text: '子分类2.1', link: '/language/java/test'},
            {text: '子分类2.2', link: '/language/java/test'}
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: 'Copyright © 2024-present MakerHu'
    }
  }
})
