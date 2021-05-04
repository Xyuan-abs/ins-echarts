# InsSingleY

直角坐标系单 y 轴：支持线图 line 、 柱状图 bar 、 散点图 scatter 、 象形柱图 pictorialBar

## 基础配置

`name` : `String` 图例名称<br>
`data` : `Array` 图表数据<br>
`type` : `String` line/bar/scatter/pictorialBar ----- 图表类型 为 line<br>
`unit` : `String` y 轴单位<br>

::: demo

```vue
<template>
  <div>
    <div class="charts-box">
      <ins-chart-single-y :list="listLine" :unit="unit" />
    </div>
    <div class="charts-box">
      <ins-chart-single-y :list="listBar" :unit="unit" />
    </div>
    <div class="charts-box">
      <ins-chart-single-y :list="listScatter" :unit="unit" />
    </div>
    <div class="charts-box">
      <ins-chart-single-y :list="listPictorialBar" :unit="unit" />
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      listLine: [
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
      listBar: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
        },
      ],
      listScatter: [
        {
          name: "scatter",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "scatter",
        },
      ],
      listPictorialBar: [
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "pictorialBar",
        },
      ],
      unit: "单位：人",
    };
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

## line

### 折线、曲线、阶梯线

`lineShape` : `String` 线的形状：smooth、step ----- 默认为折线<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" />
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
            { name: "1月", value: 12 },
            { name: "2月", value: 15 },
            { name: "3月", value: 12 },
            { name: "4月", value: 15 },
          ],
          type: "line",
        },
        {
          name: "lineSmooth",
          data: [
            { name: "1月", value: 7 },
            { name: "2月", value: 9 },
            { name: "3月", value: 10 },
            { name: "4月", value: 8 },
          ],
          type: "line",
          lineShape: "smooth",
        },
        {
          name: "lineStep",
          data: [
            { name: "1月", value: 6 },
            { name: "2月", value: 1 },
            { name: "3月", value: 6 },
            { name: "4月", value: 1 },
          ],
          type: "line",
          lineShape: "step",
        },
      ],
    };
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

### 实线、虚线、点线

`lineType` : `String` 线的类型：solid、dashed、dotted ----- 默认为 solid<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "lineSolid",
          data: [
            { name: "1月", value: 13 },
            { name: "2月", value: 5 },
            { name: "3月", value: 13 },
            { name: "4月", value: 5 },
          ],
          type: "line",
        },
        {
          name: "lineDashed",
          data: [
            { name: "1月", value: 5 },
            { name: "2月", value: 13 },
            { name: "3月", value: 5 },
            { name: "4月", value: 13 },
          ],
          type: "line",
          lineType: "dashed",
        },

        {
          name: "lineDotted",
          data: [
            { name: "1月", value: 5 },
            { name: "2月", value: 10 },
            { name: "3月", value: 5 },
            { name: "4月", value: 10 },
          ],
          type: "line",
          lineType: "dotted",
        },
      ],
    };
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

### color

`color` : `String | Array` 自定义颜色,不传则使用 [默认色系](/md/colors) 对应的颜色。传数组则为从左往右的渐变色。格式：color:[startColor,endColor]<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
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
        },
        {
          name: "lineStr",
          data: [
            { name: "1月", value: 7 },
            { name: "2月", value: 11 },
            { name: "3月", value: 6 },
            { name: "4月", value: 11 },
          ],
          color: "#7658ff",
        },
        {
          name: "lineArr",
          data: [
            { name: "1月", value: 4 },
            { name: "2月", value: 8 },
            { name: "3月", value: 3 },
            { name: "4月", value: 8 },
          ],
          color: ["#04cfd6", "#7658ff"],
        },
      ],
      unit: "单位：人",
    };
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

### 背景

`withBg` : `Boolean` 是否有背景<br>
`bgColor` : `String | Array` 背景颜色 `不传`
默认为线的颜色
`String` 纯色
`Array` 自上而下的渐变色。color:[startColor,endColor] <br>
`bgOpacity` : `Number` 背景透明度 0-1<br>
`isBgGradient` : `Boolean` 背景是否渐变 只有 `bgColor` 不为数组时生效

::: demo

```vue
<template>
  <div class="charts-box rows-2">
    <div class="row">
      <ins-chart-single-y :list="list1" />
    </div>
    <div class="row">
      <ins-chart-single-y :list="list2" />
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list1: [
        {
          name: "lineBg",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 12 },
            { name: "3月", value: 14 },
            { name: "4月", value: 12 },
            { name: "5月", value: 10 },
          ],
          type: "line",
          withBg: true,
          bgOpacity: 0.5,
        },
        {
          name: "lineBgColor",
          data: [
            { name: "6月", value: 10 },
            { name: "7月", value: 12 },
            { name: "8月", value: 14 },
            { name: "9月", value: 12 },
            { name: "10月", value: 10 },
          ],
          type: "line",
          withBg: true,
          bgColor: "#7658ff",
        },
      ],
      list2: [
        {
          name: "lineBgArr",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 12 },
            { name: "3月", value: 14 },
            { name: "4月", value: 12 },
            { name: "5月", value: 10 },
          ],
          type: "line",
          withBg: true,
          bgColor: ["#7658ff", "#83c1ff"],
        },
        {
          name: "lineBgGradient",
          data: [
            { name: "6月", value: 10 },
            { name: "7月", value: 12 },
            { name: "8月", value: 14 },
            { name: "9月", value: 12 },
            { name: "10月", value: 10 },
          ],
          type: "line",
          withBg: true,
          isBgGradient: true,
        },
      ],
    };
  },
};
</script>
<style>
.charts-box.rows-2 {
  height: 700px;
}
.charts-box > div {
  height: 350px;
}
</style>
```

:::

## bar

### label

`labelPosition` : `String | null` 是否展示 label 及 label 的位置，为空时不展示<br>
具体样式配置通过 [seriesConfig](#自定义-series-配置) 设置

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          labelPosition: "top",
        },
      ],
      unit: "单位：人",
    };
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

### 圆角

`barRadius` : `Number | Array`<br>
`Number` 统一设置四个角的圆角大小<br>
`Array` 顺时针左上，右上，右下，左下<br>
::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          barRadius: 20,
        },
      ],
      unit: "单位：人",
    };
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

### 宽度

`barWidth` : `Number | String`<br>
`Number` 具体数值 单位为 px<br>
`String` 百分比<br>
最大宽度为 40px 可通过 [seriesConfig](#自定义-series-配置) 修改
::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          barWidth: 20,
        },
      ],
      unit: "单位：人",
    };
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

### color

`color` : `String | Array` 自定义颜色,<br>
`不传` 使用 [默认色系](/md/colors) 对应的颜色<br>
`String` 纯色<br>
`Array` 自上而下的渐变色。color:[startColor,endColor]<br>
::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
        },
        {
          name: "barStr",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          color: "#7659ff",
        },
        {
          name: "barArr",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          color: ["#04cfd6", "#7659ff"],
        },
      ],
      unit: "单位：人",
    };
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

### 背景

`withBg` : `Boolean` 是否有背景<br>
`bgColor` : `String` 背景颜色
`不传` 默认颜色 rgb(220, 220, 220, 0.8)
`String` 纯色<br>
`bgOpacity` : `Number` 背景透明度 0-1<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          withBg: true,
        },
        {
          name: "barBg",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          withBg: true,
          bgColor: "#7659ff",
          bgOpacity: 0.5,
        },
      ],
      unit: "单位：人",
    };
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

### 横向

`isRow` : `Boolean` 是否是横向<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" :is-row="isRow" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
        },
      ],
      unit: "单位：人",
      isRow: true,
    };
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

### 单柱自定义颜色

`color` : `String` 纯色<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" :is-row="isRow" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10, color: "#0885ff" },
            { name: "2月", value: 14, color: "#05cfd7" },
            { name: "3月", value: 9, color: "#7659ff" },
            { name: "4月", value: 14, color: ["#05cfd7", "#7659ff"] },
          ],
          type: "bar",
        },
      ],
      unit: "单位：人",
      isRow: true,
    };
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

### 横向-群体渐变

`isRow` : `Boolean` 是否横向<br>
`isBarsGradient` : `Boolean` 是否群体渐变<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" :is-row="isRow" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "bar",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
          isBarsGradient: true,
        },
      ],
      unit: "单位：人",
      isRow: true,
    };
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

## scatter

### 图标

`symbol` : `String` 散点图的图标 默认为'circle' <br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "scatter",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "scatter",
        },
        {
          name: "scatterPin",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "scatter",
          symbol: "pin",
        },
        {
          name: "scatterIcon",
          data: [
            { name: "1月", value: 5 },
            { name: "2月", value: 9 },
            { name: "3月", value: 4 },
            { name: "4月", value: 5 },
          ],
          type: "scatter",
          symbol:
            "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
        },
      ],
      unit: "单位：人",
    };
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

### 图标大小

`size` : `Number` 图标大小 <br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "scatter",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "scatter",
        },
        {
          name: "scatterPin",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "scatter",
          symbol: "pin",
          size: 16,
        },
      ],
      unit: "单位：人",
    };
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

### color

`color` : `String` 图标颜色 纯色 <br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "scatter",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "scatter",
        },
        {
          name: "scatterPin",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "scatter",
          color: "#7659ff",
        },
      ],
      unit: "单位：人",
    };
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

## pictorialBar

### 图标

`symbol` : `String` 象形柱状图的图标 默认为 path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z <br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "pictorialBar",
          symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
        },
      ],
      unit: "单位：人",
    };
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

### color

`color` : `String | Array` 颜色<br>
`不传` 使用 [默认色系](/md/colors) 对应的颜色<br>
`String` 纯色<br>
`Array` 自上而下的渐变色.color:[startColor,endColor]<br>
`isGradient` : `Boolean` 是否渐变 只有 color 为纯色是有效
::: demo

```vue
<template>
  <div>
    <div class="charts-box">
      <ins-chart-single-y :list="list1" />
    </div>
    <div class="charts-box">
      <ins-chart-single-y :list="list2" />
    </div>
    <div class="charts-box">
      <ins-chart-single-y :list="list3" />
    </div>
    <div class="charts-box">
      <ins-chart-single-y :list="list4" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      list1: [
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "pictorialBar",
        },
      ],
      list2: [
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "pictorialBar",
          color: "#7659ff",
        },
      ],
      list3: [
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "pictorialBar",
          color: ["#04cfd6", "#7659ff"],
        },
      ],
      list4: [
        {
          name: "pictorialBar",
          data: [
            { name: "1月", value: 15 },
            { name: "2月", value: 19 },
            { name: "3月", value: 14 },
            { name: "4月", value: 19 },
          ],
          type: "pictorialBar",
          color: "#7659ff",
          isGradient: true,
        },
      ],
      unit: "单位：人",
    };
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

## 通用配置

### 堆叠

`stack` : `String` 堆叠标识<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "lineStack1",
          data: [
            { name: "1月", value: 9 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          withBg: true,
          stack: "stack",
        },
        {
          name: "lineStack2",
          data: [
            { name: "1月", value: 14 },
            { name: "2月", value: 9 },
            { name: "3月", value: 14 },
            { name: "4月", value: 9 },
          ],
          withBg: true,
          stack: "stack",
        },
        {
          name: "lineStack3",
          data: [
            { name: "1月", value: 1 },
            { name: "2月", value: 6 },
            { name: "3月", value: 1 },
            { name: "4月", value: 6 },
          ],
          withBg: true,
          stack: "stack",
        },
      ],
    };
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

### 色系

`colors` : `Array` 自定义色系 、不传则使用 [默认色系](/md/colors)

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :colors="colors" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      colors: ["#04CFD6", "#2F7CFD", "#3A4DFF"],
      list: [
        {
          name: "lineStack1",
          data: [
            { name: "1月", value: 9 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          withBg: true,
          stack: "stack",
        },
        {
          name: "lineStack2",
          data: [
            { name: "1月", value: 14 },
            { name: "2月", value: 9 },
            { name: "3月", value: 14 },
            { name: "4月", value: 9 },
          ],
          withBg: true,
          stack: "stack",
        },
        {
          name: "lineStack3",
          data: [
            { name: "1月", value: 1 },
            { name: "2月", value: 6 },
            { name: "3月", value: 1 },
            { name: "4月", value: 6 },
          ],
          withBg: true,
          stack: "stack",
        },
      ],
    };
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

### dataZoom

`hasZoom` : `Boolean` 是否展示缩放轴<br>

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :hasZoom="hasZoom" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "lineHasZoom",
          data: [
            { name: "1月", value: 9 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "bar",
        },
      ],
      hasZoom: true,
    };
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

### 空数据

`emptyText` : `String` 空数据提示文本内容，默认为暂无数据，也可通过 slot:empty 实现自定义展示<br>
以下两种实现效果一致

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :emptyText="emptyText">
      <template #empty>
        <span :style="style">
          {{ emptyText }}
        </span>
      </template>
    </ins-chart-single-y>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "lineHasZoom",
          data: [],
          type: "bar",
        },
      ],
      emptyText: "这张图表是空的啊~",
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: " translateX(-50%) translateY(-50%)",
        lineHeight: 1.5,
      },
    };
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

### 自定义 series 配置

`seriesConfig` : `Object | Function` 对象/函数<br>
`Object` ：配置对象<br>
`Function` ：return 一个配置对象 `function(color){return {...}}`
具体配置参照 echarts 官网

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "lineObject",
          data: [
            { name: "1月", value: 14 },
            { name: "2月", value: 18 },
            { name: "3月", value: 13 },
            { name: "4月", value: 18 },
          ],
          type: "line",
          seriesConfig: {
            symbolSize: 10,
          },
        },
        {
          name: "lineFunction",
          data: [
            { name: "1月", value: 10 },
            { name: "2月", value: 14 },
            { name: "3月", value: 9 },
            { name: "4月", value: 14 },
          ],
          type: "line",
          seriesConfig: (color) => {
            return {
              label: {
                show: true,
                color: color,
              },
            };
          },
        },
      ],
      unit: "单位：人",
    };
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

### 自定义 options 配置

`options` : `Object` 自定义配置对象<br>
具体配置参照 echarts 官网

::: demo

```vue
<template>
  <div class="charts-box">
    <ins-chart-single-y :list="list" :unit="unit" :options="options" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [
        {
          name: "lineObject",
          data: [
            { name: "1月", value: 2 },
            { name: "2月", value: 8 },
            { name: "3月", value: 2 },
            { name: "4月", value: 8 },
          ],
        },
      ],
      unit: "单位：人",
      options: {
        title: {
          show: true,
          text: "这是一个标题啊~",
          left: "auto",
          right: 0,
          textStyle: {
            fontSize: 14,
          },
        },
      },
    };
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

## 配置参数

### 基本参数

| 参数           | 说明                                                            | 类型             | 可选值     | 默认值                 |
| :------------- | :-------------------------------------------------------------- | :--------------- | :--------- | :--------------------- |
| list           | 图表数据及其他配置，详情见 [list 参数](#list-参数)              | Array            | -          | []                     |
| unit           | 展示在 y 轴上方的单位，格式为 单位：xxx                         | String           | -          | -                      |
| colors         | 自定义色系、支持 RGB、HEX、HSL                                  | Array            | -          | [默认色系](/md/colors) |
| hasZoom        | 是否展示滚动轴                                                  | Boolean          | true/false | false                  |
| emptyText      | 空数据时显示的文本内容，也可以通过 slot="empty" 设置            | String           | -          | 暂无数据               |
| options        | 自定义 options 配置，会覆盖预设配置                             | Object           | -          | {}                     |
| isRow          | 是否横向展示、一般用于展示横向柱状图                            | Boolean          | true/false | false                  |
| sort           | 是否使用 sort 函数对 list 里的每个 data 排序,默认根据 name 排序 | Boolean/Function | -          | true                   |
| tooltipTrigger | tooltip 的触发方式                                              | String           | axis/item  | axis                   |

### list 参数

| 参数         | 说明                                                                                                                                                                                              | 类型              | 可选值                        | 默认值         |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------- | :---------------------------- | :------------- |
| name         | 图例的名称                                                                                                                                                                                        | String            | -                             | -              |
| data         | 图表数据，详情见 [data 参数](#data-参数)                                                                                                                                                          | String            | -                             | -              |
| type         | 图表类型                                                                                                                                                                                          | String            | line/bar/scatter/pictorialBar | line           |
| color        | 自定义颜色，不传使用[默认色系](/md/colors)，String 为纯色、Array 为自上而下的渐变`[startColor,endColor]`[<sup>\[ 1 \]</sup>](#备注)                                                               | String /Array     | -                             | -              |
| withBg       | 是否存在背景，当 type 为 line 或 bar 时生效                                                                                                                                                       | Boolean           | true/false                    | false          |
| bgColor      | 背景颜色 ,不传使用[默认色系](/md/colors)，String 为纯色、Array 为自上而下的渐变`[startColor,endColor]`，柱状图背景颜色默认为 `rgb(220, 220, 220, 0.8)`                                            | String /Array     | true/false                    | -              |
| bgOpacity    | 背景颜色透明度                                                                                                                                                                                    | Number            | 0-1                           | line:0.5,bar:1 |
| seriesConfig | 单个序列的特殊配置，会覆盖预设配置 ，Object 为具体配置，Function return 一个配置对象 `function(color){return {...}}`, 具体参考 [Echarts-series](https://echarts.apache.org/zh/option.html#series) | Object / Function | -                             | -              |

#### line 的特殊配置

| 参数         | 说明                                             | 类型    | 可选值              | 默认值 |
| :----------- | :----------------------------------------------- | :------ | :------------------ | :----- |
| lineShape    | 线的形状,不传默认为折线                          | String  | smooth/step         | -      |
| lineType     | 线的类型                                         | String  | solid/dashed/dotted | solid  |
| isBgGradient | 背景颜色是否简单渐变， 当 bgColor 不为数组时生效 | Boolean | true/false          | false  |

#### bar 的特殊配置

| 参数           | 说明                                                                                                                         | 类型            | 可选值                                                                                                | 默认值 |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------- | :----- |
| labelPosition  | 是否展示 label 及 label 的位置,为 null 时不展示                                                                              | String / null   | 参考 [Echarts 柱状图 label 位置](https://echarts.apache.org/zh/option.html#series-bar.label.position) | null   |
| barRadius      | 柱体圆角 ，Number 统一设置四个角的圆角大小，Array 顺时针左上，右上，右下，左下                                               | Number / Array  | -                                                                                                     | -      |
| barWidth       | 柱体宽度，Number 为具体数值 单位为 px ，String 为百分比，默认最大宽度为 40px,可通过 [seriesConfig](#自定义-series-配置) 修改 | Number / String | true/false                                                                                            | false  |
| isBarsGradient | 柱体颜色是否群体渐变， 当 isRow 为 true，且 color 不为数组                                                                   | Boolean         | true/false                                                                                            | false  |

#### scatter 的特殊配置

| 参数   | 说明         | 类型   | 可选值                                                                                 | 默认值 |
| :----- | :----------- | :----- | :------------------------------------------------------------------------------------- | :----- |
| symbol | 散点图的图标 | String | 参考 [Echarts-symbol](https://echarts.apache.org/zh/option.html#series-scatter.symbol) | circle |
| size   | 图标大小     | Number | -                                                                                      | 10     |

#### pictorialBar 的特殊配置

| 参数   | 说明             | 类型   | 可选值 | 默认值                                                     |
| :----- | :--------------- | :----- | :----- | :--------------------------------------------------------- |
| symbol | 象形柱状图的图标 | String | -      | path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z |

#### 备注

\[1\] color 为 Array 且 type=line 时渐变方向为从左往右，scatter 不支持 color = Array

### data 参数

| 参数  | 说明                                               | 类型   | 可选值 | 默认值 |
| :---- | :------------------------------------------------- | :----- | :----- | :----- |
| name  | 类目轴的值，一般为 X 轴，isRow 为 true 时为 Y 轴值 | String | -      | -      |
| value | 数值轴的值，一般为 Y 轴，isRow 为 true 时为 X 轴值 | String | -      | -      |
| color | 自定义单点颜色                                     | String | -      | -      |
