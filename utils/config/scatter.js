// 散点图
export const seriesScatter = {
  type: 'scatter',
  data: [],
  itemStyle: {},
  label: {},
}

/**
 * 散点图symbol
 * @param {String} symbol
 */
export function setScatterSymbol(symbol) {
  return {
    symbol: symbol || 'circle',
  }
}

/**
 * 散点图symbol size
 * @param {Number} size
 */
export function setScatterSize(symbolSize) {
  return {
    symbolSize: symbolSize || 10,
  }
}

/**
 * 散点图color
 * @param {String} color
 */
export function setScatterColor(color) {
  return {
    itemStyle: {
      color: color,
    },
  }
}
