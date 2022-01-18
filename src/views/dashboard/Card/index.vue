<template>
  <div>
    <el-row :gutter="10">
      <!-- 第一个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="¥  123456">
            <template slot="charts">
              <span>
                周同比26.6%
                <svg
                  t="1642330965015"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4982"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 640l-256 256-256-256h192V128h128v512z"
                    p-id="4983"
                    fill="#d81e06"
                  ></path>
                </svg>
                日同比76.5%
                <svg
                  t="1642331004042"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5952"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 384L512 128 256 384h192v512h128V384z"
                    p-id="5953"
                    fill="#1afa29"
                  ></path>
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额：¥ 12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第二个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="8848">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量：998</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第三个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="成交单数" count="9988">
            <template slot="charts"> <BarChart /></template>
            <template slot="footer">
              <span>转换率：80%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第四个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="活动运营效果" count="75%">
            <template slot="charts"> 
                <ProgressChart/> </template>
            <template slot="footer">
              <span>
                周同比56.6%
                <svg
                  t="1642330530703"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3530"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 384L512 128 256 384h192v512h128V384z"
                    p-id="3531"
                    fill="#1afa29"
                  ></path>
                </svg>
                日同比18.8%
                <svg
                  t="1642330588349"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4707"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 640l-256 256-256-256h192V128h128v512z"
                    p-id="4708"
                    fill="#d81e06"
                  ></path>
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProgressChart from "./ProgressChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Detail from "./Detail";
export default {
  name: "Card",
  components: { Detail, LineChart, BarChart ,ProgressChart},
};
</script>

<style>
</style>