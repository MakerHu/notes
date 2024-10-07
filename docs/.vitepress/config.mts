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
      { text: '分类一', link: '/mycategory1/' },
      { text: '分类二', link: '/mycategory2/' },
      {
        text: '下拉菜单',
        items: [
          { text: '分类一', link: '/mycategory1/' },
          { text: '分类二', link: '/mycategory2/' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/mycategory1/': [
        { text: '分类一', link: '/mycategory1/' },
        {
          text: '示例',
          collapsed: false,
          items: [
            {text: 'API 示例', link: '/mycategory1/example/api-examples'},
            {text: 'markdown 示例', link: '/mycategory1/example/markdown-examples'}
          ]
        }
      ],
      '/mycategory2/': [
        { text: '分类二', link: '/mycategory2/' },
        {
          text: '子分类1',
          collapsed: false,
          items: [
            {text: '子分类1.1', link: '/mycategory2/sub1/sub-atrical-one'},
            {text: '子分类1.2', link: '/mycategory2/sub1/sub-atrical-two'}
          ]
        },
        {
          text: '子分类2',
          collapsed: false,
          items: [
            {text: '子分类2.1', link: '/mycategory2/sub2/sub-atrical-one'},
            {text: '子分类2.2', link: '/mycategory2/sub2/sub-atrical-two'}
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
