<!--
名称：ins-process //进程图
版本：1.0.0
作者：谢元将
时间：2020年8月28日14:48:23
-->
<template>
  <div class="ins-process">
    <ins-base
      ref="ChartBase"
      :has-data="hasData"
      :empty-text="emptyText"
      :options="optionsResult"
      v-on="$listeners"
    >
      <template v-slot:empty>
        <slot name="empty"> </slot>
      </template>
    </ins-base>
  </div>
</template>
<script>
/* echarts图表相关 */
import InsBase from '../../chart-base/src/main'
import ECharts from 'vue-echarts'

import { format } from '@utils/common'
import { colors } from '@utils/echartsCommon'
import { optionsBase, getTooltipFmt } from '@utils/echartsConfig'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
// let date = Number(new Date().getTime())

export default {
  name: 'InsProcess',
  components: { InsBase },
  props: {
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: '状态1',
          //   data: [
          //     { name: 'categoryA', value: [1000, date + 1000, date + 1000 * 2] },
          //     { name: 'categoryA', value: [1000, date + 1000 * 4, date + 1000 * 5] },
          //     { name: 'categoryB', value: [1000, date + 1000, date + 1000 * 2] },
          //     { name: 'categoryC', value: [1000, date + 1000, date + 1000 * 2] },
          //   ],
          // },
          // {
          //   name: '状态2',
          //   data: [
          //     { name: 'categoryA', value: [1000, date + 1000 * 7, date + 1000 * 8] },
          //     { name: 'categoryB', value: [1000, date + 1000 * 4, date + 1000 * 5] },
          //     { name: 'categoryC', value: [1000, date + 1000 * 3, date + 1000 * 4] },
          //     { name: 'categoryD', value: [1000, date + 1000 * 3, date + 1000 * 4] },
          //   ],
          // },
        ]
      },
    }, //data
    dataZoom: { type: [Number, Boolean], default: false }, //是否显示放大缩小滚动轴
    options: { type: Object, default: () => ({}) }, //自定义options
    unit: { type: String, default: '单位：万元' }, //单位
    colors: { type: Array, default: () => colors }, //颜色表
    emptyText: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: {},
      listResult: [],
      startTime: 0,
    }
  },
  computed: {
    hasData() {
      return Boolean(this.list?.length)
    },
  },
  watch: {
    list: {
      handler() {
        this.init()
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.listResult = cloneDeep(this.list)
      if (this.listResult?.length) {
        this.startTime = this.listResult
          .reduce((prev, cur) => prev.concat(cur.data.map(d => d.value[1])), [])
          .sort((a, b) => a - b)[0]
        this.render()
      }
    },
    async fetchData() {},
    render() {
      let options = {
        color: this.colors,
        tooltip: {
          trigger: 'item', //'axis'
          formatter: params => {
            let name = params.data.name
            let value = params.data.value
            let seriesName = params.seriesName
            let color = params.color
            let style = {
              panel: `padding:7px;`,
              title: `font-size:14px;margin-bottom:10px;font-weight:blod;`,
              icon: `display:inline-block;
                width:12px;
                height:12px;
                border-radius:50%;
                margin-right:5px;
                background-color:${color};
                `,
              text: `line-height:20px;font-size:12px;`,
            }
            let icon = `<span style="${style.icon}"></span>`

            let div = `
            <div style="${style.panel}">
              <div style="${style.title}">${icon}${name}     ${seriesName}</div>
              <div style="${style.text}">开始于：${format(value[1])}</div>
              <div style="${style.text}">结束于：${format(value[2])}</div>
              <div style="${style.text}">持续：${value[3]}ms</div>
            </div>
            `
            return div
          },
        },
        legend: {
          data: this.getLegendData(),
        },
        xAxis: {
          min: this.startTime,
          scale: true,
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#EBEFF6',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#8996a9',
            formatter: val => {
              let str = format(val)

              if (str.length > 10) {
                return str.substring(0, 10) + '\n' + str.substring(10)
              } else {
                return str
              }
            },
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            margin: 12,
            color: '#8996a9',
            lineHeight: 16,
            formatter: val => {
              let str = ''
              let arr = val.split('')
              for (let i = 0; i < arr.length; i++) {
                str += arr[i]
                if ((i + 1) % 7 === 0 && i + 1 !== arr.length) {
                  str += '\n'
                }
              }
              return str
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EBEFF6',
            },
          },
          axisTick: {
            show: false,
          },
          data: this.getyAxisData(),
        },
        series: this.getSerise(),
      }
      if (this.dataZoom) {
        options.dataZoom = [
          {
            type: 'slider',
            show: true,
            width: 12,
            backgroundColor: '#eff3f7',
            borderColor: '#fff',
            fillerColor: '#B1C2D7',
            yAxisIndex: [0],
            start: 1,
            end: this.dataZoom,
            showDetail: false,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#B1C2D7',
            },
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 1,
            end: this.dataZoom,
            zoomOnMouseWheel: false,
            moveOnMouseWheel: true,
          },
        ]
      }
      this.optionsResult = merge(
        {},
        optionsBase,
        options, //生成的options
        this.options //外部传入的options
      )
    },
    renderItem(params, api) {
      var categoryIndex = api.value(0)
      var start = api.coord([api.value(1), categoryIndex])
      var end = api.coord([api.value(2), categoryIndex])
      var height = api.size([0, 1])[1] * 0.6

      var rectShape = ECharts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 6,
          width: end[0] - start[0],
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      )

      return (
        rectShape && {
          type: 'rect',
          shape: rectShape,
          style: api.style(),
        }
      )
    },
    getLegendData() {
      return this.listResult.map(d => d.name)
    },
    getyAxisData() {
      let result = []
      let arr = this.listResult.reduce((prev, cur) => prev.concat(cur.data.map(d => d.name)), [])

      result = Array.from(new Set(arr))

      return result
    },
    getSerise() {
      let result = []
      this.listResult.forEach((d, i) => {
        let series = {
          name: d.name,
          type: 'custom',
          renderItem: this.renderItem,
          encode: {
            x: [1, 2],
            y: 0,
            tooltip: 3,
          },
          data: this.getSeriseData(d.data, this.colors[i]),
        }

        result.push(series)
      })
      return result
    },
    getSeriseData(data, color) {
      let result = null

      let yAxis = this.getyAxisData()

      result = data.map(item => {
        let index = yAxis.findIndex(d => d === item.name)
        return {
          name: item.name,
          value: [index].concat(item.value[1], item.value[2], item.value[0]),
          unit: this.unit,
          itemStyle: {
            color: color,
          },
        }
      })
      return result
    },
    /* 事件 */
    dispatchAction(...arg) {
      this.$refs.ChartBase.dispatchAction(...arg)
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-process {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
