<template>
  <el-card class="box-card">
    <!-- header -->
    <div slot="header" class="clearfix">
      <!-- 头部左侧 -->
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          class="date"
          v-model="date"
          type="daterange"
          range-separator="-"
          size="mini"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- content -->
    <el-row :gutter="10">
      <el-col :span="20">
        <div class="chart" ref="chart"></div>
      </el-col>
      <el-col :span="4" class="right">
        <h3>门店{{ title }}排名</h3>
        <ul>
          <li>
            <span class="rindex">0</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span class="rindex">1</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span class="rindex">3</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>4</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>5</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>6</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>7</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      date: [],
      barChart: null,
    };
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  watch: {
    title() {
      //   console.log(123);
      this.barChart.setOption({
        title: {
          text: this.title + "趋势",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 52, 200, 334, 390, 330, 220],
          },
        ],
      });
    },
  },
  mounted() {
    this.barChart = echarts.init(this.$refs.chart);
    this.barChart.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 今日
    setDay() {
      let dayjs = require("dayjs");
      //import dayjs from 'dayjs' // ES 2015
      const day = dayjs().format("YYYY-MM-DD");
      //    console.log(day);
      this.date = [day, day];
    },
    //本周
    setWeek() {
        let dayjs=require('dayjs')
        const start=dayjs().day(1).format('YYYY-MM-DD')
        const end=dayjs().day(7).format('YYYY-MM-DD')
        this.date=[start,end]
    },
    // 本月
    setMonth(){
        let dayjs=require('dayjs')
        const start=dayjs().startOf('month').format('YYYY-MM-DD')
        const end=dayjs().endOf('month').format('YYYY-MM-DD')
        // console.log(start,end);
        this.date=[start,end]
    },
    // 本年
      setYear(){
        let dayjs=require('dayjs')
        const start=dayjs().startOf('year').format('YYYY-MM-DD')
        const end=dayjs().endOf('year').format('YYYY-MM-DD')
        // console.log(start,end);
        this.date=[start,end]
    }
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tabs {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  top: 0;
}
.right span {
  margin: 0 10px;
}
.date {
  width: 300px;
}
.chart {
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
</style>