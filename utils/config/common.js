import { getTooltipFmt } from './tooltip'

export const optionsBase = {
  /* title */
  title: {
    show: false,
    textStyle: {
      fontSize: 12,
      color: '#8996a9',
      fontWeight: '500',
    },
    rotate: -90,
    top: 8,
    left: 3,
  },
  /* grid */
  grid: {
    left: 15,
    right: 35,
    top: 45,
    bottom: 10,
    containLabel: true,
  },
  /* legend */
  legend: {
    show: true,
    type: 'scroll',
    itemWidth: 18,
    width: '80%',
    height: '80%',
    top: 8,
    left: 'center',
    textStyle: {
      color: '#8996a9',
    },
    selectedMode: true,
    selected: [],
    data: [],
  },
}

// 颜色表
// export const colors = [
//   '#0885ff',
//   '#ff9c26',
//   '#00CEA6',
//   '#FF665E',
//   '#1dcf2f',
//   '#fe7dea',
//   '#40b4fd',
//   '#ff665e',
//   '#546cff',
//   '#ebcb5c',
//   '#00bd98',
//   '#ab67ff',
//   '#219173',
//   '#ff5722',
//   '#4e97b2',
//   '#ff71b4',
//   '#43a047',
//   '#db3c37',
//   '#9ea2ab',
//   '#2b7aab',
//   '#00bcd4',
//   '#7681EB',
// ]
export const colors = ['#0885ff', '#ff665e', '#f69421', '#1dcf2f', '#00bd98', '#00bcd4']

/**
 * tooltip触发条件
 * @param {String} trigger
 */
export function setTooltip(trigger) {
  let triggers = ['axis', 'item']
  /* 判断是否为合法值 */
  if (!triggers.find(d => d === trigger)) {
    trigger = triggers[0]
    console.warn(`tooltip触发条件只支持${triggers.join('、')}`)
  }
  return Object.assign(
    {
      trigger,
      axisPointer: {
        type: 'none',
      },
      padding: 8,
      backgroundColor: 'rgba(51,51,51,0.98)',
    },
    getTooltipFmt(trigger)
  )
}

/**
 * 设置xAxis
 * @param {Array} data
 * @param {Boolean} hasZoom
 * @param {Boolean} isRow
 */
export function setAxisX(data, unit, isRow, max, min, hasZoom) {
  let res = {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#8996a9',
      margin: hasZoom ? 20 : 10,
      lineHeight: 14,
      formatter(params) {
        if (params.length > 7) {
          return params.substring(0, 7) + '\n' + params.substring(7)
        } else {
          return params
        }
      },
    },
    data: data,
  }
  if (isRow) {
    Object.assign(res, {
      name: unit,
      nameLocation: 'end',
      nameTextStyle: {
        color: '#8996a9',
        padding: [0, 0, -35, 0],
      },
      nameGap: 15,
      type: 'value',
      max,
      min,
      interval: (max - min) / 5,
      data: null,
    })
  }
  return res
}

/**
 * 设置yAxis
 * @param {String} unit
 * @param {Boolean} isRow
 * @param {Boolean} getDataFun
 */
export function setAxisY(data, unit, isRow, max, min) {
  let res = {
    name: unit,
    nameLocation: 'end',
    nameTextStyle: {
      color: '#8996a9',
      padding: [0, 0, 4, 0],
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#8996a9',
    },
    splitLine: {
      lineStyle: {
        color: '#efefef',
      },
    },

    interval: (max - min) / 5,
    type: 'value',
    data: null,
  }
  if (!isRow) {
    Object.assign(res, {
      max,
      min,
    })
  }
  if (isRow) {
    Object.assign(res, {
      name: '',
      type: 'category',
      data: data,
    })
  }
  return res
}

/**
 * 设置dataZoom
 * @param {Boolean} hasZoom
 * @param {Boolean} isRow
 */
export function setDataZoom(hasZoom, isRow) {
  if (!hasZoom) return null
  let base = {
    show: true,
    orient: 'horizontal',
    height: 10,
    xAxisIndex: 0,
    bottom: 30,
    start: 0,
    end: 100,
    startValue: 0,
    endValue: 100,
    minSpan: 10,
    color: '#fff',
    backgroundColor: '#f3f5f6',
    fillerColor: '#dcdcdc',
    textStyle: false,
    handleIcon:
      'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '130%',
    handleStyle: {
      color: '#dcdcdc',
    },
    showDataShadow: false,
    borderColor: '#fff',
  }

  if (isRow) {
    Object.assign(base, {
      orient: 'vertical',
      xAxisIndex: null,
      yAxisIndex: 0,
      right: 10,
      top: 'center',
      width: 10,
      height: '80%',
    })
  }
  return [
    base,
    {
      show: false,
    },
  ]
}

/**
 * 设置堆叠
 * @param {String} stack
 */
export function setStack(stack) {
  return {
    stack,
  }
}

/**
 * 设置更多自定义配置
 * @param {String} seriesConfig
 */
export function setMore(seriesConfig, ...arg) {
  let res = {}
  if (!seriesConfig) return res
  /* 判断参数类型 */
  let type = Object.prototype.toString.call(seriesConfig)
  if (type === '[object Function]') {
    res = seriesConfig(...arg)
  } else if (type === '[object Object]') {
    res = seriesConfig
  }
  return res
}
