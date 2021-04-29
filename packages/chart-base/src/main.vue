<!--
名称：echarts组件-基本图表
版本：1.0.0
作者：Insuan
时间：2020年8月21日15:00:42
-->
<template>
  <div class="ins-base">
    <!-- ins-base -->
    <ECharts v-if="hasData" ref="echarts" autoresize :options="optionsResult" v-on="$listeners" />
    <div v-else class="no-data">
      <slot name="empty">
        <span>
          {{ emptyText }}
        </span>
      </slot>
    </div>
  </div>
</template>
<script>
import merge from 'lodash/merge'

export default {
  name: 'InsBase',
  components: {},
  props: {
    options: { type: Object, default: null }, //自定义options
    hasData: { type: Boolean, default: false }, //有无数据
    emptyText: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: null,
    }
  },
  computed: {},
  watch: {
    options: {
      handler() {
        this.init()
      },
      deep: true,
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.render()
    },
    render() {
      this.optionsResult = merge({}, this.options)
    },
    onClick(...arg) {
      this.$emit('click', ...arg)
    },
    dispatchAction(...arg) {
      this.$refs.echarts.dispatchAction(...arg)
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-base {
  font-size: inherit;
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
  }
  .no-data {
    width: 100%;
    height: 100%;
    position: relative;
    color: #606266;
    padding: 0;
    margin: 0;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      line-height: 1.5;
    }
  }
}
</style>
