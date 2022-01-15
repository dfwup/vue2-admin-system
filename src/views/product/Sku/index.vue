<template>
  <div>
    <!-- sku列表 -->
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column prop="skuName" label="名称" width="300px">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="300px">
      </el-table-column>
      <el-table-column label="默认图片" width="110px">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="">
        <el-button
          type="success"
          icon="el-icon-sort-up"
          size="mini"
        ></el-button>
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="info" icon="el-icon-info" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器
          @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[10, 15, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      skuList: [],
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //获取skuList
    async getSkuList() {
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.skuList = result.data.records;
        this.total = result.data.total;
      }
    },
    //切换页码
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getSkuList();
    },
    //切换每页显示个数
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.getSkuList()
    },
  },
};
</script>

<style>
</style>