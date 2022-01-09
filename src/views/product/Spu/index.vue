<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @getCategoryId="getCategoryId" :isShow="!show" />
    </el-card>
    <el-card>
      <!-- 三种状态切换 -->
      <!-- 第一种展示spu列表 -->
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table style="width: 100%" border="" :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 占位，将来换成hint -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SPU"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前SPU的全部SKU列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除SPU"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器
              @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          :current-page="page"
          :page-sizes="[3, 5, 7]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="total"
          style="text-align: center"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true, //控制三级联动的可操作性
      page: 1, //当前页数
      limit: 3, //每页展示数据
      records: [], //存储spu列表
      total: 0, //数据个数
    };
  },
  methods: {
    //三级联动的自定义事件
    getCategoryId({ categoryId, level }) {
      //categoryId获取1，2，3级的id
      //level区分获得的id时几级
      if (level == 1) {
        this.category1Id = categoryId;
        //清空
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        //获取三级列表的id时发请求,获取spu数据
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    //获取spu数据
    async getSpuList(pager = 1) {
      this.page = pager;
      //需要携带三个参数
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //分页器切换页面,可以优化到getSpuList
    // handleCurrentChange(page) {
    //   this.page=page
    //   this.getSpuList()
    // },
    //修改每页展示数据个数
    handleSizeChange(limit) {
      console.log(limit);
      this.limit = limit;
      this.getSpuList();
    },
  },
};
</script>

<style>
</style>