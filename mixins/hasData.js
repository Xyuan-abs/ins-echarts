export default {
  computed: {
    hasData() {
      return !!this.list.length && this.list.some(item => item.data.length)
    },
  },
}
