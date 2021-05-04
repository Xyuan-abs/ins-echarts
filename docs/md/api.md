## events

参考 [Echarts-events](https://echarts.apache.org/zh/api.html#events)<br>
示例:

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y
      :list="list"
      :unit="unit"
      @click="click"
      @legendselected="legendselected"
    />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "line",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "line",
        },
      ],
      unit: "单位：人",
    };
  },
  methods: {
    click(...arg) {
      console.log("click -> arg", ...arg);
    },
    legendselected(...arg) {
      console.log("legendselected -> arg", ...arg);
    },
  },
};
</script>
<style>
.charts-box {
  height: 350px;
}
</style>
```

:::

## action

调用 dispatchAction 函数，参数参考 [Echarts-action](https://echarts.apache.org/zh/api.html#action)<br>
示例:

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" ref="ins-chart-single-y" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "line",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "line",
        },
      ],
      unit: "单位：人",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["ins-chart-single-y"].dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: 0,
      });
    });
  },
};
</script>
<style>
.charts-box {
  height: 350px;
}
</style>
```

:::
