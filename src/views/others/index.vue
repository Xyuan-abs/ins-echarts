<template>
  <div class="others flex">
    <card-panel :title="'AngleBar'" :code="AngleBarList">
      <ins-angle-bar :list="AngleBarList"></ins-angle-bar>
    </card-panel>
    <card-panel :title="'Radar'" class="radar" :code="RadarList">
      <ins-radar :list="RadarList"></ins-radar>
    </card-panel>
    <card-panel :title="'Treemap'" class="radar" :code="TreemapList">
      <ins-treemap :list="TreemapList"></ins-treemap>
    </card-panel>
    <card-panel :title="'process'" class="process" :code="ProcessList">
      <ins-process :list="ProcessList"></ins-process>
    </card-panel>
    <card-panel :title="'map'" class="process" :code="ProcessList">
      <ins-base :has-data="true" :options="options" />
    </card-panel>
    <card-panel :title="'doubleY'" class="process" :code="ProcessList">
      <ins-double-y :list="doubleList" :unit="['单位：个', '单位：人']" />
    </card-panel>
  </div>
</template>

<script>
import CardPanel from '@/components/CardPanel'

let date = Number(new Date().getTime())

export default {
  name: 'Others',
  props: {},
  components: { CardPanel },
  data() {
    return {
      AngleBarList: [
        {
          name: 'ceshi',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 10 },
            { name: '3月', value: 13 },
            { name: '4月', value: 10 },
          ],
        },
      ],
      RadarList: [
        {
          name: 'ceshi',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 11 },
            { name: '3月', value: 3 },
            { name: '4月', value: 10 },
            { name: '5月', value: 10 },
          ],
        },
        {
          name: 'ceshi2',
          data: [
            { name: '1月', value: 1 },
            { name: '2月', value: 10 },
            { name: '3月', value: 15 },
            { name: '4月', value: 1 },
            { name: '6月', value: 15 },
          ],
        },
      ],
      TreemapList: [
        {
          name: '测试',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 11 },
            { name: '3月', value: 3 },
            { name: '4月', value: 10 },
            { name: '5月', value: 10 },
          ],
        },
      ],
      ProcessList: [
        {
          name: '状态1',
          data: [
            { name: 'categoryA', value: [1000, date + 1000, date + 1000 * 2] },
            { name: 'categoryA', value: [1000, date + 1000 * 4, date + 1000 * 5] },
            { name: 'categoryB', value: [1000, date + 1000, date + 1000 * 2] },
            { name: 'categoryC', value: [1000, date + 1000, date + 1000 * 2] },
          ],
        },
        {
          name: '状态2',
          data: [
            { name: 'categoryA', value: [1000, date + 1000 * 7, date + 1000 * 8] },
            { name: 'categoryB', value: [1000, date + 1000 * 4, date + 1000 * 5] },
            { name: 'categoryC', value: [1000, date + 1000 * 3, date + 1000 * 4] },
            { name: 'categoryD', value: [1000, date + 1000 * 3, date + 1000 * 4] },
          ],
        },
      ],
      doubleList: [
        {
          name: '测试',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 11 },
            { name: '3月', value: 3 },
            { name: '4月', value: 10 },
            { name: '5月', value: 10 },
          ],
          yAxisIndex: 0,
        },
        {
          name: '测试3',
          data: [
            { name: '1月', value: 17 },
            { name: '2月', value: 21 },
            { name: '3月', value: 13 },
            { name: '4月', value: 20 },
            { name: '5月', value: 20 },
          ],
          type: 'bar',
          yAxisIndex: 1,
        },
      ],
      options: {},
    }
  },
  mounted() {
    this.options = {
      visualMap: {
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: false,
        orient: 'horizontal',
        inRange: {
          color: ['#e0ffff', '#006edd'],
          symbolSize: [30, 100],
        },
      },
      tooltip: {
        show: false,
      },
      series: [
        {
          name: 'iphone4',
          type: 'map',
          mapType: 'china',
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          data: [
            {
              name: '北京',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '天津',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '上海',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '重庆',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '河北',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '河南',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '云南',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '辽宁',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '黑龙江',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '湖南',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '安徽',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '山东',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '新疆',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '江苏',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '浙江',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '江西',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '湖北',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '广西',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '甘肃',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '山西',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '内蒙古',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '陕西',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '吉林',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '福建',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '贵州',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '广东',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '青海',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '西藏',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '四川',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '宁夏',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '海南',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '台湾',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '香港',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
            {
              name: '澳门',
              value: Math.round(Math.random() * 1000),
              tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
            },
          ],
        },
      ],
    }
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.others {
  ::v-deep .process {
    .content {
      width: 815px;
    }
  }
}
</style>
