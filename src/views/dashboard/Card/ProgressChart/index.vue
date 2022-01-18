<template>
  <div class="barChart" ref="barChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressChart",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var progressChart = echarts.init(this.$refs.barChart);
    // 绘制图表
    progressChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          name: "销量",
          type: "bar",
          data: [75],
          barWidth:10,
          color: "orange",
          showBackground: true,
           label:{
             show:true,
             //改变文本内容
             formatter:'完成度',
             //文本标签位置调试
             position:'right'
          }
        },
        
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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

