<template>
  <div>
    <!-- 三级联动 -->
    <el-card style="margin: 20px 0">
      <CategorySelector @getCategoryId="getCategoryId" />
    </el-card>
    <!-- 表格数据展示 -->
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table border :data="attrInfoList" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100px"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名" width="200">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          border
          style="width: 100%; margin: 20px 0"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- span与input切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <!-- Popconfirm 气泡确认框 -->
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                :title="`确定要删除${row.valueName}吗`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="addOrUpdateAttr">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrInfoList: [],
      isShowTable: true, //控制表格的显示与隐藏

      //收集---新增/修改属性的数据
      attrInfo: {
        attrName: "",
        attrValueList: [
          // 占位 点击的时候才有
          // {
          //   attrId: 0, //属性名id
          //   valueName: "",
          // },
        ],
        categoryId: 0, //三级分类id
        categoryLevel: 3, //level3
      },
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
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrInfoList = result.data;
      }
    },
    //添加属性值
    addAttrValue() {
      //向属性值的数组中添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //修改属性值时，可以在已有属性的基础上添加id
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性
    addAttr() {
      //显示
      this.isShowTable = false;
      //清除数据,收集三级分类id
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id, //三级分类id
        categoryLevel: 3, //level3
      };
    },
    //修改数据
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      //修改属性时，添加flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag=false//flag不是响应式数据
        this.$set(item, "flag", false);
      });
    },
    //切换为查看模式
    toLook(row) {
      //判断添加的属性值是否为空
      if (row.valueName.trim() == "") {
        this.$message("输入不能为空");
        return;
      }
      let repeat = this.attrInfo.attrValueList.some((item) => {
        //将最新的输入（row）从数组排除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      // console.log(repeat);
      if (repeat) {
        this.$message("输入不能重复");
        return;
      }

      row.flag = false;
      // console.log(row);
    },
    //切换为编辑模式
    toEdit(row, index) {
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重拍耗时间的
      //点击span的时候，重绘重拍一个input它是需要耗费事件，因此我们不可能一点击span立马获取到input
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取相应的input表单元素实现聚焦
        // this.$refs[index].focus();
        console.log(this.$refs[index]);
      });
    },
    //气泡框确认
    deleteAttrValue(index) {
      //不需要发请求，保存时提交表单数据
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //添加属性或者修改属性的操作
    async addOrUpdateAttr() {
      //整理参数:1,如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      //提交给服务器数据当中不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      //发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttrInfo(this.attrInfo);
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.isShowTable = true;
        this.getAttrInfoList()
      } catch (error) {

      }
    },
  },
};
</script>

<style>
</style>