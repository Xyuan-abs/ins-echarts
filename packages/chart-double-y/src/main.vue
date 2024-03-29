<!--
名称：ins-double-y
版本：1.0.0
作者：谢元将
时间：2020年8月24日11:41:13 
参数：list[{
        // 以下为公共配置
        name: '', // 序列名
        data: [ 
          { name: '', value: ''} // x轴标签名 值
        ],
        yAxisIndex:0,//对应的y轴index 0||1

      }]
-->
<template>
  <div class="ins-single-y">
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

import { props, hasData } from '@mixins'

import { formatList, setColor, getUnit, calMax, calMin } from '@utils/common'

import {
  optionsBase,
  setDataZoom,
  setTooltip,
  setAxisX,
  setAxisY,
  setStack,
  setMore,
} from '@utils/config/common'

import { seriesLine, setLineType, setLineShape, setLineColor, setLineBg } from '@utils/config/line'

import { seriesBar, setBarLabel, setBarItem, setBarWidth, setBarBg } from '@utils/config/bar'

import { seriesScatter, setScatterSymbol, setScatterColor } from '@utils/config/scatter'

import {
  seriesPictorialBar,
  setPictorialBarSymbol,
  setPictorialBarItem,
} from '@utils/config/pictorialBar'

/* lodash 按需引入 */
import merge from 'lodash/merge'

export default {
  name: 'InsDoubleY',
  components: {
    InsBase,
  },
  mixins: [props, hasData],
  props: {
    unit: { type: Array, default: () => [] }, //单位
    sort: { type: [String, Function], default: null }, //是否适用sort函数进行排序 string->date按日期排序
    tooltipTrigger: { type: String, default: 'axis' }, //tooltip的触发方式
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
      /* 无数据则不渲染 */
      if (!this.hasData) return false
      /* 格式化list  补全data */
      this.listResult = formatList(this.list, this.sort, this.isNullZero)
      /* 配置echarts图表 */
      this.render()
    },
    render() {
      const arr1 = this.listResult.filter(item => item.yAxisIndex === 0)
      const arr2 = this.listResult.filter(item => item.yAxisIndex === 1)
      const max1 = calMax(arr1)
      const min1 = calMin(arr1)
      const max2 = calMax(arr2)
      const min2 = calMin(arr2)
      const options = {
        legend: {
          data: this.getLegendData(),
        },
        tooltip: setTooltip(this.tooltipTrigger),
        xAxis: setAxisX(this.getXAxisData(), this.unit, false, this.hasZoom),
        yAxis: [
          merge(setAxisY([], this.unit[0]), {
            nameTextStyle: {
              padding: [0, -40, 0, 0],
            },
            max: max1,
            min: min1,
            interval: (max1 - min1) / 5,
          }),
          merge(setAxisY(this.unit[1]), {
            nameTextStyle: {
              padding: [0, 40, 0, 0],
            },
            max: max2,
            min: min2,
            interval: (max2 - min2) / 5,
          }),
        ],
        series: this.getSeries(),
        dataZoom: setDataZoom(this.hasZoom),
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
      return this.listResult.map(d => d.name) ?? []
    },
    /* 获取x轴data */
    getXAxisData() {
      return this.listResult[0].data?.map(d => d.name) ?? []
    },
    /* 设置序列 */
    getSeries() {
      return this.listResult.map((item, index) => this.setSeriesItem(item, index))
    },
    setSeriesItem(item, index) {
      let colors = this.colors
      let { type = 'line', color = colors[index % colors.length] } = item

      let result = {}
      /* 四种类型：line、bar、scatter、pictorialBar */
      let map = {
        line: this.setLine,
        bar: this.setBar,
        scatter: this.setScatter,
        pictorialBar: this.setPictorialBar,
      }
      if (map[type]) {
        result = Object.assign(map[type](item, color), {
          name: item.name,
          data: this.setSeriesData(item, color),
          yAxisIndex: item.yAxisIndex,
        })
      }

      return result
    },
    /* 通过修改seriesData实现单个节点配置 */
    setSeriesData(item) {
      let { data } = item

      let result = data.map((d, i) => {
        /* 单位 */
        let unit = getUnit(this.unit[item.yAxisIndex])

        let { itemStyle = {}, emphasis = {} } = d

        /* 自定义单个节点的颜色 */
        if (d.color) {
          merge(itemStyle, {
            color: setColor(d.color),
          })
          merge(emphasis, {
            itemStyle: {
              color: setColor(d.color),
            },
          })
        }

        return Object.assign({}, d, {
          unit,
          itemStyle,
          emphasis,
        })
      })

      return result
    },
    setLine(item, color) {
      let bgColor = item.withBg ? (item.bgColor ? item.bgColor : color) : null

      let result = merge(
        {},
        seriesLine, //线的基本配置
        setLineType(item.lineType), //设置线的类型：实线、虚线、点线
        setLineShape(item.lineShape), //设置线的形状：折线、曲线、阶梯线
        setLineColor(color), //设置线的颜色
        setLineBg(bgColor, item.bgOpacity, item.isBgGradient), //设置背景颜色
        setStack(item.stack), //设置堆叠
        setMore(item.seriesConfig, color) //设置自定义更多配置
      )
      return result
    },
    setBar(item, color) {
      let result = merge(
        {},
        seriesBar, //bar的基本配置
        setBarLabel(item.labelPosition), //设置label
        setBarItem(color, item.barRadius), //设置bar的柱体（颜色、方向、圆角）
        setBarWidth(item.barWidth), //设置bar的宽度
        setBarBg(item.bgColor, item.withBg, item.bgOpacity, item.barRadius), //设置背景颜色
        setStack(item.stack), //设置堆叠
        setMore(item.seriesConfig, color) //设置自定义更多配置
      )
      return result
    },
    setScatter(item, color) {
      let result = merge(
        {},
        seriesScatter, //scatter的基本配置
        setScatterSymbol(item.symbol), //设置symbol
        setScatterColor(color), //设置颜色
        setStack(item.stack), //设置堆叠
        setMore(item.seriesConfig, color) //设置自定义更多配置
      )
      return result
    },
    setPictorialBar(item, color) {
      let result = merge(
        {},
        seriesPictorialBar, //pictorialBar的基本配置
        setPictorialBarSymbol(item.symbol), //设置symbol
        setPictorialBarItem(color, item.isGradient), //设置pictorialBar颜色
        setStack(item.stack), //设置堆叠
        setMore(item.seriesConfig, color) //设置自定义更多配置
      )
      return result
    },
    dispatchAction(...arg) {
      this.$refs.ChartBase.dispatchAction(...arg)
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-single-y {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
