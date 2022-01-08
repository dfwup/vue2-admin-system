<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
      <el-table
      border
        :data="attrInfoList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="attrName"
          label="属性名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="属性值列表"
          width="width">
         <template slot-scope="{row,$index}">
         <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id">{{attrValue.valueName}}</el-tag>
         </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="200">
          <template>
            <el-button type="warning" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
      attrInfoList:[],
    };
  },
  methods: {
    //自定义事件的回调函数
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发请求获得平台属性数据
        this.getAttrInfoList();
      }
    },
    //发起请求，获取属性列表
    async getAttrInfoList() {
      const {category1Id, category2Id, category3Id}=this
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id,
      );
      console.log(result);
      if (result.code==200) {
        this.attrInfoList=result.data
       
      }
    },
  },
};
</script>

<style>
</style>