<!--
名称：ins-pie
版本：1.0.0
作者：谢元将
时间：2020年8月24日11:41:13 
-->
<template>
  <div class="ins-pie">
    <ins-base
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
    </ins-base>
  </div>
</template>
<script>
/* echarts图表相关 */
import InsBase from '../../chart-base/src/main'

import { optionsBase, getTooltipFmt } from '@utils/echartsConfig'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const labelCenter = {
  label: {
    show: false,
    position: 'center',
  },
  emphasis: {
    label: {
      show: true,
    },
  },
}

export default {
  name: 'InsPie',
  components: {
    InsBase,
  },
  props: {
    title: { type: String, default: null }, //标题
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: 'ceshi',
          //   data: [
          //     { name: '1月', value: 0 },
          //     { name: '2月', value: 10 },
          //     { name: '3月', value: 13 },
          //     { name: '4月', value: 10 },
          //   ],
          // },
        ]
      },
    }, //data
    options: { type: Object, default: () => ({}) }, //自定义options
    colors: {
      type: Array,
      default: () => ['#0885ff', '#ff665e', '#f69421', '#1dcf2f', '#00bd98', '#00bcd4'],
    }, //颜色表
    showLegend: { type: Boolean, default: true }, //是否显示legend
    legendPosition: { type: String, default: 'left' }, //legend位置
    showLabel: { type: Boolean, default: true }, //是否显示label
    labelPosition: { type: String, default: 'outside' }, //legend位置
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
      return Boolean(
        this.listResult.length && this.listResult.filter(item => item.data.length).length
      )
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
      this.listResult = cloneDeep(this.list).map(d => d) //深度拷贝list
      if (this.listResult?.length) {
        this.render() //配置echarts图表
      }
    },
    render() {
      const options = {
        title: {
          show: Boolean(this.title),
          text: this.title,
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 15,
            lineHeight: 18,
          },
        },
        color: this.getColors(),
        tooltip: Object.assign(
          {
            trigger: 'item', //'axis'
          },
          getTooltipFmt('item')
        ),
        legend: {
          show: this.showLegend,
          orient: 'vertical',
          left: this.legendPosition,
          data: this.getLegendData(),
        },
        series: this.getSeries(),
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
      result = this.listResult[0].data.map(d => d.name)

      return result
    },
    getSeries() {
      let series = {
        name: this.list[0].name,
        type: 'pie',
        radius: this.showLabel ? ['40%', '60%'] : ['60%', '85%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: this.showLabel,
          position: this.labelPosition,
          fontWeight: 'bold',
          lineHeight: 14,
          alignTo: 'labelLine',
          bleedMargin: 20,
          // formatter(val) {
          //   return val.data.label || val.name + '\n' + val.percent + '%'
          // },
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
        data: this.getSeriesData(),
      }
      if (this.showLabel && this.labelPosition === 'center') {
        merge(series, labelCenter)
      }
      return [series]
    },
    getCenter() {
      const defaultCenter = ['50%', '50%']
      if (!this.showLegend) {
        return defaultCenter
      } else {
        return [this.isLegendLeft ? '60%' : '40%', '50%']
      }
    },
    getSeriesData() {
      let result = null
      result = this.listResult[0].data

      return result
    },
    /* 事件 */
    legendselectchanged(val) {
      this.$emit('legendselectchanged', val)
    },
    click(val) {
      this.$emit('click', val)
    },
    getColors(key) {
      let start = 200
      let end = 280
      let length = this.list.find(d => d.type === key)?.data.length
      // let result =
      //   this.list.find(d => d.type === key)?.data.length > this.colorMIn.length
      //     ? this.color
      //     : this.colorMIn
      let step = ((end - start) / length).toFixed(0)

      return new Array(length).fill('').map((d, i) => `hsl(${(start + step * i) % 360},100%,50%)`)
      // return [
      //   '#ff4343',
      //   '#f69846',
      //   '#f6d54a',
      //   '#45dbf7',
      //   '#44aff0',
      //   '#4777f5',
      //   '#5045f6',
      //   '#ad46f3',
      //   '#f845f1',
      // ]
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-pie {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
