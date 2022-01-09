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
        <el-table style="width: 100%" border="">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="prop"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="prop"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 占位，将来换成hint -->
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
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
          :current-page="6"
          :page-sizes="[3, 5, 7]"
          :page-size="3"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="30"
          style="text-align: center"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true, //控制三级联动的可操作性
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
    getSpuList() {},
  },
};
</script>

<style>
</style>