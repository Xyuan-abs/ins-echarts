/**
 * 设置中心标题
 * @param {String} title
 */
export function setTitle(title) {
  return {
    show: Boolean(title),
    text: title,
    left: 'center',
    top: 'center',
    textStyle: {
      fontSize: 15,
      lineHeight: 18,
    },
  }
}
/**
 * 设置默认series配置
 * @param {String} title
 */
export function setDefaultSeries(name) {
  return {
    name: name,
    type: 'pie',
    radius: ['40%', '60%'],
    center: ['50%', '50%'],
    avoidLabelOverlap: true,
    label: {
      show: true,
      position: 'outside',
      fontWeight: 'bold',
      lineHeight: 14,
      alignTo: 'labelLine',
      formatter(val) {
        return val.data.label || val.name + '\n' + val.percent + '%'
      },
    },
    labelLine: {
      normal: {
        show: true,
        lineStyle: {
          width: 2,
        },
      },
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 2,
    },
  }
}
