<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @getCategoryId="getCategoryId" />
    </el-card>
    <el-card> </el-card>
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