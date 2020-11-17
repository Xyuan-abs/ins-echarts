<!--
名称：ins-chart-single-y
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
  <div class="ins-chart-single-y">
    <ins-chart-base
      ref="ChartBase"
      :has-data="hasData"
      :empty-text="emptyText"
      :options="optionsResult"
      @click="click"
      @legendselectchanged="legendselectchanged"
    >
      <template v-slot:empty>
        <slot name="empty"> </slot>
      </template>
    </ins-chart-base>
  </div>
</template>
<script>
/* echarts图表相关 */
import InsChartBase from '../../chart-base/src/main'

import { completionX, setColorOpacity, setColor, fmtUnit } from '../../../utils/common'

import {
  optionsBase,
  colors,
  setDataZoom,
  setTooltip,
  setAxisX,
  setAxisY,
  setStack,
  setMore,
} from '../../../utils/config/common'

import {
  seriesLine,
  setLineType,
  setLineShape,
  setLineColor,
  setLineBg,
} from '../../../utils/config/line'

import {
  seriesBar,
  setBarLabel,
  setBarItem,
  setBarWidth,
  setBarBg,
} from '../../../utils/config/bar'

import { seriesScatter, setScatterSymbol, setScatterColor } from '../../../utils/config/scatter'

import {
  seriesPictorialBar,
  setPictorialBarSymbol,
  setPictorialBarItem,
} from '../../../utils/config/pictorialBar'

/* lodash 按需引入 */
import merge from 'lodash/merge'

export default {
  name: 'InsChartSingleY',
  components: {
    InsChartBase,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: '平均',
          //   data: [
          //     { name: '1月', value: 10, max: 12, min: 8 },
          //     { name: '2月', value: 14, max: 16, min: 12 },
          //     { name: '3月', value: 9, max: 11, min: 7 },
          //     { name: '4月', value: 14, max: 16, min: 12 }
          //   ],
          //   type: 'line',
          // }
        ]
      },
    },
    options: { type: Object, default: () => ({}) }, //自定义options
    colors: { type: Array, default: () => colors }, //颜色表
    unit: { type: String, default: '单位：万元' }, //单位
    isSort: { type: Boolean, default: false }, //是否适用sort函数进行排序
    isRow: { type: Boolean, default: false }, //是否为横向，一般作用于柱状图
    hasZoom: { type: Boolean, default: false }, //是否有缩放
    tooltipTrigger: { type: String, default: 'axis' }, //tooltip的触发方式
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
      if (this.list?.length) {
        /* 格式化list  补全data */
        this.listResult = completionX(this.list, this.isSort)
        /* 配置echarts图表 */
        this.render()
      }
    },
    render() {
      const options = {
        legend: {
          data: this.getLegendData(),
        },
        tooltip: setTooltip(this.tooltipTrigger),
        xAxis: setAxisX(this.getXAxisData(), this.hasZoom, this.isRow),
        yAxis: setAxisY(this.unit, this.isRow, this.getXAxisData()),
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
    /* 设置序列 */
    getSeries() {
      const result = []
      this.listResult.forEach((item, index) => {
        result.push(
          merge({}, this.getSerieItem(item, index), {
            name: item.name,
            data: item.data,
          })
        )
      })
      return result
    },
    getSerieItem(item, index) {
      let type = item.type || 'line'
      let color = item.color || this.colors[index % this.colors.length]

      let result = {}
      /* 四种类型：line、bar、scatter、pictorialBar */
      let map = {
        line: this.setLine,
        bar: this.setBar,
        scatter: this.setScatter,
        pictorialBar: this.setPictorialBar,
      }
      if (map[type]) {
        result = map[type](item, color)
      }
      /* data中携带单个节点特殊配置 */
      this.setSeriesData(item, color)

      return result
    },
    /* 通过修改seriesData实现单个节点配置 */
    setSeriesData(item, color) {
      /* 单个节点配置 */
      item.data.forEach(d => {
        /* 单位 */
        d.unit = fmtUnit(this.unit)
        /* 自定义单个节点的颜色 */
        if (d && d.color) {
          Object.assign(d, {
            itemStyle: {
              color: setColor(d.color),
            },
            emphasis: {
              itemStyle: {
                color: setColor(d.color),
              },
            },
          })
        }
      })

      /* 横向柱状图颜色渐变 */
      if (this.isRow && item.type === 'bar' && item.isBarsGradient) {
        let gradientColor = this.setGradientColor(color, item.data.length)
        item.data.forEach((d, i) => {
          Object.assign(d, {
            itemStyle: {
              color: gradientColor[i],
            },
            emphasis: {
              itemStyle: {
                color: gradientColor[i],
              },
            },
          })
        })
      }
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
    setGradientColor(color, length) {
      let result = []
      for (let i = 0; i < length; i++) {
        result.push(setColorOpacity(color, ((i + 1) / length).toFixed(2)))
      }
      return result
    },
    /* 事件 */
    legendselectchanged(val) {
      let hasSelected = false
      for (let key in val.selected) {
        if (val.selected[key]) {
          hasSelected = true
        }
      }
      if (!hasSelected) {
        this.$refs.ChartBase.$refs.echarts.dispatchAction({
          type: 'legendSelect',
          name: val.name,
        })
      }
      this.$emit('legendselectchanged', val)
    },
    click(val) {
      this.$emit('click', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-chart-single-y {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
