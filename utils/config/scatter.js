// 点状图
export const seriesScatter = {
  type: 'scatter',
  data: [],
  itemStyle: {},
  label: {},
}

/**
 * 点状图symbol
 * @param {String} symbol
 */
export function setScatterSymbol(symbol) {
  return {
    symbol: symbol || 'circle',
  }
}

/**
 * 点状图color
 * @param {String} color
 */
export function setScatterColor(color) {
  return {
    itemStyle: {
      color: color,
    },
  }
}
