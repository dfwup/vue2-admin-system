<template>
  <div>
    <!-- 行内表单 -->
    <el-form :inline="true" class="demo-form-inline" :model="categoryForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryForm.category1Id"
          @change="handler1"
        >
          <el-option
            :label="category1.name"
            :value="category1.id"
            v-for="category1 in category1List"
            :key="category1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryForm.category2Id"
          @change="handler2"
        >
          <el-option
            :label="category2.name"
            :value="category2.id"
            v-for="category2 in category2List"
            :key="category2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryForm.category3Id"
          @change="handler3"
        >
          <el-option
            :label="category3.name"
            :value="category3.id"
            v-for="category3 in category3List"
            :key="category3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelector",
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      attrInfoList: [],
      //收集id
      categoryForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.attr.reqGetCategory1List();
      //   console.log(result);
      if (result.code == 200) {
        this.category1List = result.data;
        return "ok";
      }
    },
    async handler1() {
      //清除数据
      this.category2List = [];
      this.category3List = [];
      this.categoryForm.category2Id = "";
      this.categoryForm.category3Id = "";
      //解构一级分类的id
      const { category1Id } = this.categoryForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let result = await this.$API.attr.reqGetCategory2List(category1Id);
      //   console.log(result);
      if (result.code == 200) {
        this.category2List = result.data;
        return "ok";
      }
    },
    async handler2() {
      //清除数据
      this.category3List = [];
      this.categoryForm.category3Id = "";

      //解构二级分类id
      const { category2Id } = this.categoryForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      //用二级分类的id去请求三级分类数组
      let result = await this.$API.attr.reqGetCategory3List(category2Id);
      if (result.code == 200) {
        this.category3List = result.data;
        return "ok";
      }
    },
    //三级分类的回调
    async handler3() {
      const { category3Id } = this.categoryForm;
      this.$emit("getCategoryId", { categoryId: category3Id, lever: 3 });
    },
  },
};
</script>

<style>
</style>」