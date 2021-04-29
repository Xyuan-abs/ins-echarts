import { colors } from '@utils/config/common'

export default {
  props: {
    list: { type: Array, default: () => [] }, //数据
    options: { type: Object, default: () => ({}) }, //自定义options
    unit: { type: String, default: '单位：万元' }, //单位
    emptyText: { type: String, default: '这张图表是空的啊~' }, //没有数据时显示的提示文字
    colors: { type: Array, default: () => colors }, //颜色表
    hasZoom: { type: Boolean, default: false }, //是否有缩放
    isNullZero: { type: Boolean, default: false }, //没有数据时是否展示为0
  },
}
