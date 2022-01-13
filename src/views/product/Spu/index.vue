<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @getCategoryId="getCategoryId" :isShow="scene != 0" />
    </el-card>
    <el-card>
      <!-- 三种状态切换 -->
      <!-- spu列表 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
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
          <el-table-column  label="操作" width="width">
            <!-- 插槽实现按钮 -->
            <template slot-scope="{ row, $index }">
           
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="updateSpu(row)"
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
                @click="deleteSpu(row)"
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
      <!-- 页面较复杂，拆成子组件 -->
      <!-- 添加/修改spu -->
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu" />
      <!-- 添加sku -->
      <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku" />
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      isShow: true, //控制三级联动的可操作性
      page: 1, //当前页数
      limit: 3, //每页展示数据
      records: [], //存储spu列表
      total: 0, //数据个数
      scene: 0, //0展示spu  1添加/修改spu   2添加sku   data中的响应式数据
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
    //添加spu
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      // console.log(result);//data null
      if (result.code == 200) {
        this.$message("删除spu成功");
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //修改spu
    updateSpu(row) {
      this.scene = 1;
      //通过ref获取子组件spuForm,调用其中的方法
      //
      this.$refs.spu.initSpuForm(row);
      // console.log(this.$refs.spu);
    },
    //添加sku
    addSku(row) {
      console.log(row);
      this.scene = 2;

      //调用sku组件的方法，发送请求
      this.$refs.sku.getSkuData(this.category1Id,this.category2Id,row);
    },
    //自定义事件
    changeScene({ scene, flag }) {
      //flag这个形参为了区分保存按钮是添加还是修改
      //切换结构（场景）
      this.scene = scene;
      //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
  },
};
</script>

<style>
</style>