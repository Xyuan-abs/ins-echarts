# InsDoubleY

直角坐标系双 y 轴：支持线图 line 、 柱状图 bar 、 散点图 scatter 、 象形柱图 pictorialBar

## 基础用法

`type` : `String` line/bar/scatter/pictorialBar ----- series 类型 默认为 line<br>
`yAxisIndex` : `Number` 对应 y 轴的序号<br>
`unit` : `Array` y 轴单位<br>

::: demo

```vue
<template>
  <div class="rows-2">
    <div class="row">
      <ins-chart-double-y :list="list" :unit="unit" />
    </div>
    <div class="row">
      <ins-chart-double-y :list="list2" :unit="unit" />
    </div>
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
          yAxisIndex: 0,
        },
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          yAxisIndex: 1,
        },
      ],
      list2: [
        {
          name: "scatter",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "scatter",
          yAxisIndex: 0,
        },
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "pictorialBar",
          yAxisIndex: 1,
        },
      ],
      unit: ["单位：人", "单位：个"],
    };
  },
};
</script>
<style>
.rows-2 {
  height: 700px;
}
.row {
  height: 350px;
}
</style>
```

:::

## 配置参数

| 参数       | 说明                                                   | 类型   | 可选值 | 默认值 |
| :--------- | :----------------------------------------------------- | :----- | :----- | :----- |
| yAxisIndex | 对应 y 轴的序号                                        | Number | -      | -      |
| unit       | 展示在 y 轴上方的单位，格式为 ["单位：y0", "单位：y1"] | Array  | -      | -      |

::: tip 更多配置

- InsDoubleY 相较于 ChartSingleY 不支持 `isRow` <br>
- 其他配置参照 [InsSingleY](/md/components/ins-single-y)
  :::
