import request from '@/utils/request'
//获取spu列表数据的接口
//GET /admin/product/{page}/{limit}     参数page,limit,category3Id
export const reqSpuList=(page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit} `,
    method:'get',
    params:{category3Id}//category3Id没有在路径中出现，用params参数携带，key-value一致，省略value
})

//根据id获取某一个spu信息  GET  /admin/product/getSpuById/{spuId}  参数：spuId
export const reqGetSpuInfo=(spuId)=>request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get'
})

//获取品牌接口  GET /admin/product/baseTrademark/getTrademarkList   无参数
export const reqGetTradeMarkList=()=>request({
    url:'/admin/product/baseTrademark/getTrademarkList',
    method:'get'
})

//获取SPU图片    GET /admin/product/spuImageList/{spuId} 参数：spuId
export const reqGetSpuImageList=(spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})

//获取平台中全部的销售属性（3个） GET /admin/product/baseSaleAttrList   无参数
export const reqGetBaseSaleAttrList=()=>request({
    url:'/admin/product/baseSaleAttrList',
    method:'get'
})



