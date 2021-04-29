<!--
名称：ins-pie-nested
版本：1.0.0
作者：谢元将
时间：2020年8月31日10:24:34

-->
<template>
  <div class="ins-pie-nested">
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

import { optionsBase, setTooltip, colors, setMore } from '@utils/config/common'
import { hex2Rgb, rgb2Hsl } from '@utils/color'
import { setTitle, setDefaultSeries } from '@utils/config/pie'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'InsPieNested',
  components: {
    InsBase,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: 'listNested',
          //   data: [
          //     {
          //       name: '1月iner',
          //       value: 10,
          //       children: [
          //         { name: '1月outer1', value: 2 },
          //         { name: '1月outer2', value: 2 },
          //         { name: '1月outer3', value: 2 },
          //         { name: '1月outer4', value: 2 },
          //         { name: '1月outer5', value: 2 },
          //       ],
          //     },
          //     {
          //       name: '2月iner',
          //       value: 10,
          //       children: [
          //         { name: '2月outer1', value: 3 },
          //         { name: '2月outer2', value: 3 },
          //         { name: '2月outer3', value: 4 },
          //       ],
          //     },
          //     {
          //       name: '3月iner',
          //       value: 13,
          //       children: [
          //         { name: '3月outer1', value: 5 },
          //         { name: '3月outer2', value: 5 },
          //         { name: '3月outer3', value: 3 },
          //       ],
          //     },
          //   ],
          // },
        ]
      },
    }, //data
    options: { type: Object, default: () => ({}) }, //自定义options
    colors: { type: Array, default: () => colors }, //颜色表  link模式只支持hsl格式
    isLink: { type: Boolean, default: true }, //内外颜色是否同一色系
    showLegend: { type: Boolean, default: true }, //是否显示legend
    legendPosition: { type: String, default: 'left' }, //legend位置
    unit: { type: String, default: '单位：万元' }, //单位
    emptyText: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: {},
      listResult: [],
    }
  },
  computed: {
    hasData() {
      return Boolean(this.list.length && this.list.filter(item => item.data.length).length)
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
      this.listResult = cloneDeep(this.list) //深度拷贝list
      if (this.listResult?.length) {
        this.render() //配置echarts图表
      }
    },
    render() {
      const options = {
        color: this.colors,
        tooltip: setTooltip('item'),
        legend: {
          show: true,
          orient: 'vertical',
          left: 'left',
          data: this.getLegendData(),
        },
        series: [
          {
            name: 'inner',
            type: 'pie',
            radius: [0, '40%'],
            label: {
              position: 'inner',
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
            },
            data: this.getSeriesData('inner'),
          },
          {
            name: 'outer',
            type: 'pie',
            radius: ['50%', '68%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              fontWeight: 'bold',
              lineHeight: 14,
              formatter(val) {
                return val.data.label || val.name + '\n' + val.percent + '%'
              },
            },
            labelLine: {
              normal: {
                show: true,
                lineStyle: {
                  width: 2,
                },
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
            },
            data: this.getSeriesData('outer'),
          },
        ],
      }
      this.optionsResult = merge(
        {},
        optionsBase, //基本options
        options, //生成的options
        this.options //外部传入的options
      )
    },
    /* 设置图表信息 */
    /* 获取所有图例data */
    getLegendData() {
      let result = null

      if (this.list.length) {
        let inner = this.list[0].data.map(d => d.name)
        let outer = this.list[0].data.reduce((prev, cur) => {
          return prev.concat(cur.children.map(d => d.name))
        }, [])
        result = inner.concat(outer)
      }
      return result
    },
    getSeriesData(type) {
      let result = []
      if (type === 'outer') {
        if (this.isLink) {
          let index = 0
          result = this.listResult[0].data.reduce((prev, cur) => {
            let colors = this.setGradientColor(this.colors[index], cur.children.length)
            let arr = cur.children.map((d, i) =>
              Object.assign({}, d, {
                itemStyle: {
                  color: colors[i],
                },
                emphasis: {
                  itemStyle: {
                    color: colors[i],
                  },
                  labelLine: {
                    lineStyle: {
                      color: colors[i],
                    },
                  },
                },
              })
            )
            index++
            return prev.concat(arr)
          }, [])
        } else {
          result = this.listResult[0].data.reduce((prev, cur) => {
            let arr = cur.children.map(d => d)
            return prev.concat(arr)
          }, [])
        }
      } else if (type === 'inner') {
        result = this.listResult[0].data
      }
      return result
    },
    color2hsl(color) {
      color = color.toLowerCase()

      if (color.startsWith('hsl')) {
        return color
      } else if (color.startsWith('#')) {
        color = hex2Rgb(color)
      }
      let res = rgb2Hsl(color)
      return res
    },
    setGradientColor(color, length) {
      /* 转换颜色格式为hsl */
      color = this.color2hsl(color)

      /* 设置渐变颜色 */
      let [h, s, l] = color.replace(/(?:\(|\)|hsl|HSL|%)*/g, '').split(',')
      let lnum = Number(l)

      let step = ((100 - lnum) / length).toFixed(2)
      let result = []
      for (let i = 0; i < length; i++) {
        let hsl = `hsl(${h},${s}%,${(lnum + step * i).toFixed(2)}%)`
        result.push(hsl)
      }
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
.ins-pie-nested {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
