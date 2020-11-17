import { setColor } from '../common'

// 柱状图
export const seriesBar = {
  type: 'bar',
  data: [],
  itemStyle: {},
  label: {},
  barMaxWidth: 40,
}

/**
 * 柱状图label
 * @param {String} labelPosition
 */
export function setBarLabel(labelPosition) {
  return {
    label: {
      show: Boolean(labelPosition),
      position: labelPosition,
      color: '#333',
      fontWeight: 'bold',
      fontSize: 12,
      padding: [5, 0, 5, 0],
    },
  }
}

/**
 * 柱状图item（颜色、圆角）
 * @param {String} color
 * @param {Number|Array} barRadius
 * @param {Boolean} isRow
 */
export function setBarItem(color, barRadius, isRow) {
  let derection = isRow ? [0, 0, 1, 0] : [0, 0, 0, 1]
  return {
    itemStyle: {
      color: setColor(color, 'Linear', derection),
      barBorderRadius: barRadius || 0,
    },
  }
}

/**
 * 柱状图宽度
 * @param {String} barWidth
 */
export function setBarWidth(barWidth) {
  let res = {}
  if (barWidth) {
    res = {
      barWidth: barWidth,
    }
  }
  return res
}

/**
 * 柱状图背景
 * @param {String} bgColor
 * @param {Boolean} withBg
 * @param {Number} bgOpacity
 * @param {Number} barBorderRadius
 */
export function setBarBg(bgColor, withBg, bgOpacity, barBorderRadius) {
  return {
    showBackground: bgColor || withBg,
    backgroundStyle: {
      color: bgColor || 'rgba(220, 220, 220, 0.8)',
      opacity: bgOpacity,
      barBorderRadius,
    },
  }
}
