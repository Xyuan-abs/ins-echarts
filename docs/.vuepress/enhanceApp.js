import InsEcharts from "ins-echarts";
import "ins-echarts/lib/ins-echarts.css";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(InsEcharts);
  Vue.mixin({
    mounted() {},
  });
};
