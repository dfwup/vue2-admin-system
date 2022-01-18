<template>
  <div class="barChart" ref="barChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barChart",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var barChart = echarts.init(this.$refs.barChart);
    // 绘制图表
    barChart.setOption({
      xAxis: {
        show: false,
        type:'category'
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          name: "销量",
          type: "bar",
           data: [10, 7, 33, 12, 48, 9,29,10,44,33,22,8],
           color:'green'
        },
      ],
      grid:{
          left:0,
          top:0,
          right:0,
          bottom:0
      }
    });
  },
};
</script>

<style lang="less" scoped>
.barChart {
  width: 100%;
  height: 100%;
}
</style>>

