<template>
  <div class="pie-box flex">
    <card-panel :title="'Pie'" class="pie" :code="list">
      <ins-pie :list="list" :title="'标题\n2020年8月31日'"></ins-pie>
    </card-panel>
    <card-panel :title="'内嵌pie'" class="pie-nested" :code="listNested">
      <ins-pie-nested :list="listNested"></ins-pie-nested>
    </card-panel>
    <card-panel :title="'玫瑰图'" class="pie-nested" :code="listRose">
      <ins-pie-rose :list="listRose" @click="click"></ins-pie-rose>
    </card-panel>
    <card-panel :title="'玉玦图'" class="pie-nested" :code="listYujue">
      <ins-pie-yujue :list="listYujue" @click="click"></ins-pie-yujue>
    </card-panel>
  </div>
</template>

<script>
import CardPanel from '@/components/CardPanel'
export default {
  name: 'Pie',
  props: {},
  components: { CardPanel },
  data() {
    return {
      options: {
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: 'bottom',
        },
        tooltip: {
          show: false,
        },
      },
      list: [
        {
          name: 'ceshi',
          data: [
            {
              name: '1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月1月',
              value: 10,
            },
            { name: '2月', value: 10 },
            { name: '3月', value: 13 },
            { name: '4月', value: 10 },
            { name: '5月', value: 20 },
            { name: '6月', value: 18 },
            { name: '7月', value: 15 },
            { name: '8月', value: 13 },
            { name: '9月', value: 10 },
          ],
        },
      ],
      listNested: [
        {
          name: 'listNested',
          data: [
            {
              name: '1月iner',
              value: 10,
              children: [
                { name: '1月outer1', value: 2 },
                { name: '1月outer2', value: 2 },
                { name: '1月outer3', value: 2 },
                { name: '1月outer4', value: 2 },
                { name: '1月outer5', value: 2 },
              ],
            },
            {
              name: '2月iner',
              value: 10,
              children: [
                { name: '2月outer1', value: 3 },
                { name: '2月outer2', value: 3 },
                { name: '2月outer3', value: 4 },
              ],
            },
            {
              name: '3月iner',
              value: 13,
              children: [
                { name: '3月outer1', value: 5 },
                { name: '3月outer2', value: 5 },
                { name: '3月outer3', value: 3 },
              ],
            },
          ],
        },
      ],
      listRose: [
        {
          name: 'ceshi',
          data: [
            { name: '1月', value: 30 },
            { name: '2月', value: 28 },
            { name: '3月', value: 25 },
            { name: '4月', value: 23 },
            { name: '5月', value: 20 },
            { name: '6月', value: 18 },
            { name: '7月', value: 15 },
            { name: '8月', value: 13 },
            { name: '9月', value: 10 },
          ],
        },
      ],
      listYujue: [
        {
          name: 'ceshi',
          data: [
            { name: '1月', value: 10 },
            { name: '2月', value: 10 },
            { name: '3月', value: 13 },
            { name: '4月', value: 10 },
            { name: '5月', value: 13 },
            { name: '6月', value: 10 },
          ],
        },
      ],
    }
  },
  methods: {
    click(...arg) {
      console.log(...arg)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pie-box {
  ::v-deep .pie,
  ::v-deep .pie-nested {
    .content {
      width: 600px;
    }
  }
}
</style>
