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

import { optionsBase, colors, setTooltip, setMore } from '@utils/config/common'

import { setTitle, setDefaultSeries } from '@utils/config/pie'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

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
    colors: { type: Array, default: () => colors }, //颜色表
    showLegend: { type: Boolean, default: true }, //是否显示legend
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
        title: setTitle(this.title),
        color: this.colors,
        legend: {
          show: this.showLegend,
          data: this.getLegendData(),
        },
        tooltip: setTooltip('item'),
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
      let res = []
      this.listResult.forEach(item => {
        let series = merge(
          { data: this.getSeriesData() },
          setDefaultSeries(item.name),
          setMore(item.seriesConfig)
        )
        res.push(series)
      })
      return res
    },
    getSeriesData() {
      let result = null
      result = this.listResult[0].data
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
.ins-pie {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
