import { setColorOpacity, setColor } from '../common'

// 象形柱状图
export const seriesPictorialBar = {
  type: 'pictorialBar',
  data: [],
  itemStyle: {},
  label: {},
}

/**
 * 象形柱状图symbol
 * @param {String} symbol
 */
export function setPictorialBarSymbol(symbol) {
  return {
    symbol: symbol || 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
  }
}

/**
 * 象形柱状图item（颜色）
 * @param {String} color
 * @param {Boolean} isGradient //是否渐变   只有当color部位数组时生效
 */
export function setPictorialBarItem(color, isGradient) {
  if (!Array.isArray(color) && isGradient) {
    color = [color, setColorOpacity(color, 0.1)]
  }
  return {
    itemStyle: {
      color: setColor(color),
    },
  }
}
