### 简介

ins-echarts 是基于 echarts@4.8.0、loadsh@0.0.4、vue@2.6.11、vue-echarts@5.0.0-beta.0 二次封装的 echarts 组件库

### 安装

```js
// 终端
npm i ins-echarts -S

// main.js
import InsEcharts from "ins-echarts";
import "ins-echarts/lib/ins-echarts.css";

//全部引入
Vue.use(InsEcharts);
//按需引入
const {
  SingleY,
  Pie,
  //...
} = InsEcharts

Vue.use(SingleY)
Vue.use(Pie)
//Vue.use(...)
```
