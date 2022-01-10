<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
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
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- upload上传 照片墙-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttrList.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unSelectSaleAttr.name"
            :value="`${unSelectSaleAttr.id}:${unSelectSaleAttr.name}`"
            v-for="(unSelectSaleAttr, index) in unSelectSaleAttrList"
            :key="unSelectSaleAttr.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSaleAttr"
          :disabled="unSelectSaleAttrList.length < 1"
          >添加销售属性</el-button
        >
        <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            style="text-align: center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="100">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >+添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="80">
            <!--popconfirm -->
            <template slot-scope="{ row, $index }">
              <el-popconfirm title="这是一段内容确定删除吗？">
                <el-button
                  slot="reference"
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                ></el-button>
              </el-popconfirm>
            </template>
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
      attrIdAndAttrName: "", //收集未选择的销售属性的id
      dialogImageUrl: "",
      dialogVisible: false,
      // spuInfo: {}, //初始化是一个空对象
      spu: {
        category3Id: 0,
        tmId: 0,
        description: "",
        spuName: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
    };
  },
  methods: {
    //关闭预览
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //input失去焦点时添加属性值
    handleInputConfirm(row) {
      console.log(row);
      //解构出收集的数据
      const { baseSaleAttrId, inputValue } = row;
      //判断输入的数据是否为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      //判断输入的数据是否重复
      let result = row.spuSaleAttrValueList.some((item) => {
        return  item.saleAttrValueName == inputValue;
      });
      console.log(result);
      if (result) {
        this.$message('属性值不能重复')
        return
      }

      //判断数据是否合法之后，再新增
      //将输入的数据整理成相应的格式
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      //添加到属性值列表中
      row.spuSaleAttrValueList.push(newSaleAttrValue);

      row.inputVisible = false;
    },
    //添加属性值
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    //添加属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //清空数据
      this.attrIdAndAttrName = "";
    },

    //删除图片
    handleRemove(file, fileList) {
      // console.log("删除图片");
      // console.log(file, fileList);
      this.spuImageList = fileList;
    },
    //预览图片
    handlePictureCardPreview(file) {
      // console.log("预览照片", file.url);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片成功时
    handleSuccess(response, file, fileList) {
      // console.log("上传成功", response, file, fileList);
      this.spuImageList = fileList;
    },
    //初始化spuForm数据
    async initSpuForm(spu) {
      // console.log('请求',spu);
      //获取spu信息
      let spuResult = await this.$API.spu.reqGetSpuInfo(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
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
        // this.spuImageList=imgResult.data
        //处理返回的图片数据,file-list需要name和url属性才能显示
        let listArr = imgResult.data;
        listArr.forEach((item) => {
          (item.name = item.imgName), (item.url = item.imgUrl);
        });
        this.spuImageList = listArr;
      }
      //获取所有销售属性，共三种
      let saleResult = await this.$API.spu.reqGetBaseSaleAttrList(spu.id);
      if (saleResult.code == 200) {
        this.baseSaleAttrList = saleResult.data;
      }
    },
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttrList() {
      //整个平台的销售属性一共三个：尺寸、颜色、版本 ----saleAttrList
      //当前SPU拥有的属于自己的销售属性SPU.spuSaleAttrList  ----颜色
      //数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并未返回一个新的数据
      let result = this.baseSaleAttrList.filter((item) => {
        //every数组的方法，会返回一个布尔值【真，假的】
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>