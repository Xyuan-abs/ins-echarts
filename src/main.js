import Vue from 'vue'
import App from './App.vue'

import router from './router'
import '@/style/index.scss'

Vue.config.productionTip = false

/* echarts vue-echarts按需引入 */
import 'echarts'

import ECharts from 'vue-echarts'
Vue.component('ECharts', ECharts)

import InsEcharts from '../packages/index'
Vue.use(InsEcharts)

// import InsEcharts from '../packages/index'

// import InsEcharts from '../lib/ins-echarts.umd.js'

// let {
//   Base,
//   SingleY,
//   DoubleY,
//   AngleBar,
//   Pie,
//   PieNested,
//   PieRose,
//   PieYujue,
//   Radar,
//   Treemap,
// } = InsEcharts

// Vue.use(Base)
// Vue.use(SingleY)
// Vue.use(DoubleY)
// Vue.use(AngleBar)
// Vue.use(Pie)
// Vue.use(PieNested)
// Vue.use(PieRose)
// Vue.use(PieYujue)
// Vue.use(Radar)
// Vue.use(Treemap)

// import { Line } from '../packages/index'
// console.log(Line)
// Vue.use(Line)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
