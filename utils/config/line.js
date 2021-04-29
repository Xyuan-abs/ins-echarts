import { setColorOpacity, setColor } from '../common'

// 折线图
export const seriesLine = {
  type: 'line',
  data: [],
  symbolSize: 4,
  lineStyle: {
    width: 2,
  },
  areaStyle: {},
}

/**
 * 设置线的类型
 * @param {String} type
 */
export function setLineType(type = 'solid') {
  let types = ['solid', 'dashed', 'dotted']
  /* 判断是否为合法值 */
  if (!types.find(d => d === type)) {
    type = types[0]
    console.warn(`线的类型只支持${types.join('、')}`)
  }
  return {
    lineStyle: {
      type,
    },
  }
}

/**
 * 设置线的形状
 * @param {String} shape
 */
export function setLineShape(shape) {
  let res = {}
  if (!shape) return res

  let shapes = ['smooth', 'step']
  /* 判断是否为合法值 */
  if (!shapes.find(d => d === shape)) {
    console.warn(`线的形状只支持${shapes.join('、')}`)
  } else {
    shapes.forEach(d => {
      res[d] = d === shape
    })
  }
  return res
}

/**
 * 设置线的颜色
 * @param {String} type
 */
export function setLineColor(color) {
  let res = {}
  if (color) {
    res = {
      color: setColor(color, 'linear', [0, 0, 1, 0]),
    }
  }
  return res
}

/**
 * 设置线的背景
 * @param {String} bgColor
 */
export function setLineBg(bgColor, bgOpacity = 0.5, isBgGradient = false) {
  if (!bgColor)
    return {
      areaStyle: null,
    }
  /* 格式化颜色为数组形式 */
  let color = []
  if (Array.isArray(bgColor)) {
    /* 为数组 */
    color = [...bgColor]
  } else {
    /* 为字符串 */
    if (isBgGradient) {
      color = [setColorOpacity(bgColor, 1), setColorOpacity(bgColor, 0.1)] //渐变
    } else {
      color = [bgColor, bgColor] // 非渐变
    }
  }

  return {
    areaStyle: {
      color: setColor(color),
      opacity: bgOpacity,
    },
  }
}
