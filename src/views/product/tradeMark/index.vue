<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 对话框
     -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
      :data="tradeMarkList"
    >
      <el-form style="width: 80%" :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- 不是表单元素，不能用v-model
          action:设置图片上传地址
          on-success监测图片是否上传成功
          before-upload上传图片之前
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table border style="width: 100%" :data="tradeMarkList">
      <el-table-column label="序号" align="center" type="index" width="100">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <!-- {{row}} -->
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
          <!-- 后台图片前三个挂了 -->
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit-outline"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :pager-count="7"
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
      limit: 5,
      total: 0,
      //品牌列表
      tradeMarkList: [],
      //弹出框是否显示
      dialogFormVisible: false,
      //表单信息
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
    };
  },
  mounted() {
    // console.log(this.$API);
    this.getPageList();
  },
  methods: {
    //获取页面数据
    async getPageList() {
      //解构参数
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      // console.log(result);
      if (result.code == 200) {
        this.tradeMarkList = result.data.records;
        this.total = result.data.total;
        return "ok";
      } else {
        return Promise.reject(error);
      }
    },
    //切换到当前点击页
    handleCurrentChange(page) {
      this.page = page;
      this.getPageList();
    },
    //修改每页显示个数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //添加按钮
    showDialog() {
      this.dialogFormVisible = true;
      //清除tmform数据
      this.tmForm.logoUrl = "";
      this.tmForm.tmName = "";
    },
    //修改按钮
    //row当前用户选中的信息
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      // console.log(row);
      //展示相应的信息
      // this.tmForm=row
      this.tmForm = { ...row };
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res,file);//res上传成功后，返回
      this.tmForm.logoUrl = res.data; //收集表单中图片上传之后的地址数据
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //确认按钮
    async addOrUpdateTradeMark(tmForm) {
      this.dialogFormVisible = false;
      let result = await this.$API.tradeMark.reqAddOrUpdateTradMark(
        this.tmForm
      );
      if (result.code == 200) {
        //弹出提示消息
        // this.$message(this.tmForm.id ? "修改成功" : "添加成功");
        this.$message({
          type: "success",
          message: this.tmForm.id ? "修改成功" : "添加成功",
        });
        //请求新的列表
        this.getPageList(this.tmForm.id?this.page:1);
        return "ok";
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>