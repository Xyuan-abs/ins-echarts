## 开发文档

[ins-echarts 在线开发文档](https://xyuan-abs.github.io/ins-echarts/)

## Install

```
npm i echarts vue-echarts ins-echarts -S
```

## Quick Start

### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'

import 'echarts'

import ECharts from 'vue-echarts'
Vue.component('ECharts', ECharts)

import InsEcharts from 'ins-echarts'
import 'ins-echarts/lib/ins-echarts.css'

Vue.use(InsEcharts)

new Vue({
  el: '#app',
  render: h => h(App),
})
```

### 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

```javascript
import Vue from 'vue'

import 'echarts'

import ECharts from 'vue-echarts'
Vue.component('ECharts', ECharts)

import InsEcharts from 'ins-echarts'
import 'ins-echarts/lib/ins-echarts.css'

let {
  Base,
  SingleY,
  DoubleY,
  AngleBar,
  Pie,
  PieNested,
  PieRose,
  PieYujue,
  Radar,
  Treemap,
} = InsEcharts

Vue.use(Base)
Vue.use(SingleY)
Vue.use(DoubleY)
Vue.use(AngleBar)
Vue.use(Pie)
Vue.use(PieNested)
Vue.use(PieRose)
Vue.use(PieYujue)
Vue.use(Radar)
Vue.use(Treemap)

new Vue({
  el: '#app',
  render: h => h(App),
})
```

## To Do

- support more type of echarts
