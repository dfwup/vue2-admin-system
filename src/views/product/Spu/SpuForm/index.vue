<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuInfo.id">
          <el-option
            :label="tradeMark.tmName"
            :value="tradeMark.id"
            v-for="(tradeMark, index) in tradeMarkList"
            :key="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="SPU描述"
          v-model="spuInfo.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- upload上传 照片墙-->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table border style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            style="text-align: center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- 操作里面的按钮待实现 -->
            <template slot-scope="{ row, $index }"> </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spuInfo: {},
      tradeMarkList: [],
      saleArrtList: [],
      spuImgList: [],
    };
  },
  methods: {
    //删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //初始化spuForm数据
    async initSpuForm(spu) {
      // console.log('请求',spu);
      //获取spu信息
      let spuResult = await this.$API.spu.reqGetSpuInfo(spu.id);
      if (spuResult.code == 200) {
        this.spuInfo = spuResult.data;
      }
      //获取品牌列表
      let tmResult = await this.$API.spu.reqGetTradeMarkList();
      // console.log(tmResult);
      if (tmResult.code == 200) {
        this.tradeMarkList = tmResult.data;
      }

      //获取spu图片
      let imgResult = await this.$API.spu.reqGetSpuImageList(spu.id);
      if (imgResult.code == 200) {
        this.spuImgList = imgResult.data;
      }

      //获取销售属性
      let saleResult = await this.$API.spu.reqGetSpuSaleAttrList(spu.id);
      if (saleResult.code == 200) {
        this.saleArrtList = saleResult.data;
      }
    },
  },
};
</script>

<style>
</style>