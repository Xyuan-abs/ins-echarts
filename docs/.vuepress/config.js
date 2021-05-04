module.exports = {
  title: 'InsEcharts',
  description: 'Just playing around',
  port: 8081,
  base: '/ins-echarts/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [{ text: 'GitHub', link: 'https://github.com/Xyuan-abs/ins-echarts' }],
    sidebar: {
      '/md/': [
        {
          title: '开发指南',
          collapsable: false,
          path: '/md/guide',
        },
        {
          title: '颜色表盘',
          collapsable: false,
          path: '/md/colors',
        },
        {
          title: '组件',
          collapsable: false,
          children: [
            {
              title: 'InsSingleY',
              collapsable: false,
              path: '/md/components/ins-single-y',
            },
            {
              title: 'InsDoubleY',
              collapsable: false,
              path: '/md/components/ins-double-y',
            },
          ],
        },
        {
          title: 'Api',
          collapsable: false,
          path: '/md/api',
        },
      ],
    },
  },
  plugins: [
    'demo-block',
    {
      settings: {
        //这两个配置无效  于styles的index.styl 控制不显示
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: false, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },
  ],
}
