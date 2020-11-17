/**
 * 获取tooltip的默认formatter
 * @param {String} trigger
 */
export function getTooltipFmt(trigger) {
  let formatter = null
  if (trigger === 'item') {
    formatter = itemFormatter()
  } else if (trigger === 'axis') {
    formatter = axisFormatter()
  }
  return {
    formatter,
  }
}
let itemFormatter = () => {
  /* 当tooltip的trigger为item时 */
  return null
}
let axisFormatter = () => {
  /* 当tooltip的trigger为axis时 */
  return null
}
