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
      <el-table-column prop="skuName" label="名称" width="260px">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="260px">
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
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            v-if="row.isSale == 0"
            @click="onSale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            v-else
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
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
    <!-- 抽屉 -->
    <el-drawer
      title="SKU详情"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <!-- 平台属性 -->
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="skuAttrValue in skuInfo.skuAttrValueList"
            :key="skuAttrValue.id"
            closable
            :type="skuAttrValue.type"
          >
            {{ skuAttrValue.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">销售属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="skuSaleAttrValue in skuInfo.skuSaleAttrValueList"
            :key="skuSaleAttrValue.id"
            closable
            :type="skuSaleAttrValue.type"
          >
            {{ skuSaleAttrValue.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">图片列表</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <h3 class="small">
                <img :src="item.imgUrl" alt=""  style="width:200px;"/>
              </h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
      skuInfo: {},
      drawer: false,
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
      // console.log(result);
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
      this.getSkuList();
    },
    //上架
    async onSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      //  console.log(result);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    //下架
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      console.log(result);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    //修改
    edit() {
      this.$message("正在开发中");
    },
    //显示sku详情
    async getSkuInfo(sku) {
      this.drawer = true;
      let result = await this.$API.sku.reqGetSkuById(sku.id);
      console.log(result);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    //关闭sku详情
    handleClose(done) {
      done();
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>