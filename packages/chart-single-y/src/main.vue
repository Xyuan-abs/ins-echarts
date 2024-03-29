<!--
名称：ins-single-y
版本：1.0.0 
作者：谢元将
时间：2020年8月24日11:41:13 
参数：list[{
        // 以下为公共配置
        name: '', // 序列名
        data: [ 
          { name: '', value: ''} // x轴标签名 值
        ],
        color: 'rgb(118,252,254)', // item的颜色 为数组时item颜色渐变，一般作用于bar、pictorialBar
        stack: 'stack', // 堆叠标识,用于标识堆叠数据
        withBg: false, // 是否有背景
        bgColor: 'rgb(5,126,118)', // line面积图/柱状图背景色   渐变则为数组[rgb(5,126,118),rgb(5,126,118)] 不填则为color+透明度

        // 以下为line配置
        lineShape:null //不传或为空->折线 smooth->曲线 step->阶梯线
        lineType: 'solid', // line的类型: solid,dashed,dotted
        bgOpacity:1,//背景透明度
        isBgGradient:false,//背景颜色是否渐变 当bgColor部位数组时生效

        // 以下为bar配置
        barRadius:0, // 圆角
        isBarsGradient:false//是否所有bar以一种颜色渐变

        // 以下为scatter配置
        symbol: 'circle',//点的形状

        // 以下为pictorialBar配置
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',//symbol形状
        isGradient:false, // pictorialBar颜色是都渐变（只有color不为数组时生效）
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

import { formatList, setColor, getUnit, getGradientColorList, calMax, calMin } from '@utils/common'

import {
  optionsBase,
  setTooltip,
  setAxisX,
  setAxisY,
  setStack,
  setDataZoom,
  setMore,
} from '@utils/config/common'

import { seriesLine, setLineType, setLineShape, setLineColor, setLineBg } from '@utils/config/line'

import { seriesBar, setBarLabel, setBarItem, setBarWidth, setBarBg } from '@utils/config/bar'

import {
  seriesScatter,
  setScatterSymbol,
  setScatterSize,
  setScatterColor,
} from '@utils/config/scatter'

import {
  seriesPictorialBar,
  setPictorialBarSymbol,
  setPictorialBarItem,
} from '@utils/config/pictorialBar'

/* lodash 按需引入 */
import merge from 'lodash/merge'

export default {
  name: 'InsSingleY',
  components: {
    InsBase,
  },
  mixins: [props, hasData],
  props: {
    sort: { type: [String, Function], default: null }, //是否适用sort函数进行排序 string->date按日期排序
    isRow: { type: Boolean, default: false }, //是否为横向，一般作用于柱状图
    tooltipTrigger: { type: String, default: 'axis' }, //tooltip的触发方式
  },
  data() {
    return {
      optionsResult: {},
      listResult: [],
    }
  },
  computed: {},
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
      let list = this.listResult
      const max = calMax(list)
      const min = calMin(list)
      let XData = this.getXAxisData()

      const options = {
        grid: {
          right: this.isRow ? 80 : 35,
        },
        legend: {
          data: this.getLegendData(),
        },
        tooltip: setTooltip(this.tooltipTrigger),
        xAxis: setAxisX(XData, this.unit, this.isRow, max, min, this.hasZoom),
        yAxis: setAxisY(XData, this.unit, this.isRow, max, min),
        series: this.getSeries(),
        dataZoom: setDataZoom(this.hasZoom, this.isRow),
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
    /* 设置series */
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
        })
      }
      return result
    },
    /* 通过修改seriesData实现单个节点配置 */
    setSeriesData(item, color) {
      let { data, type } = item

      let derection = this.isRow ? [1, 0, 0, 0] : [0, 0, 0, 1]

      let result = data.map((d, i) => {
        /* 单位 */
        let unit = getUnit(this.unit)
        let { itemStyle = {}, emphasis = {} } = d

        /* 自定义单个节点的颜色 */
        if (d.color) {
          merge(itemStyle, {
            color: setColor(d.color, 'linear', derection),
          })
          merge(emphasis, {
            itemStyle: {
              color: setColor(d.color, 'linear', derection),
            },
          })
        }

        /* 横向柱状图柱体逐个颜色渐变 */
        if (type === 'bar' && item.isBarsGradient) {
          let gradientColor = getGradientColorList(color, data.length)
          merge(itemStyle, {
            color: gradientColor[i],
          })
          merge(emphasis, {
            itemStyle: {
              color: gradientColor[i],
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
        setBarItem(color, item.barRadius, this.isRow), //设置bar的柱体（颜色、方向、圆角）
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
        setScatterSize(item.size), //设置symbol size
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
    /* 事件 */
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
