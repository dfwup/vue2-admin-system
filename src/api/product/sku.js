import request from '@/utils/request'

// http://localhost:9529/dev-api/admin/product/spuImageList/5704
// http://localhost:9529/dev-api/admin/product/spuSaleAttrList/5704
// http://localhost:9529/dev-api/admin/product/attrInfoList/1/1/1
//获取图片  GET /admin/product/spuImageList/{spuId}  参数spuId
export const reqGetSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
})
//获取销售属性  GET /admin/product/spuSaleAttrList/{spuId} 参数spuId
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqGetSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
})
//获取平台属性  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// 参数category1Id,category2Id,category3Id
export const reqGetAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
})
//添加sku   POST /admin/product/saveSkuInfo  参数skuInfo
export const reqAddSku = (skuInfo) => request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
})
//根据spuId获取sku列表  GET /admin/product/findBySpuId/{spuId}  参数spuId
export const reqGetSkuList = (spuId) => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
})

//获取sku列表   GET /admin/product/list/{page}/{limit} 参数 page,limit
export const reqSkuList=(page,limit)=>request({
    url:`/admin/product/list/${page}/${limit}`,
    method:'get'
})

//上架  GET /admin/product/onSale/{skuId}   参数 skuId
export const reqOnSale=(skuId)=>request({
    url: `/admin/product/onSale/${skuId} `,
    method:'get'
})
//下架  GET /admin/product/cancelSale/{skuId}    参数skuId
export const reqCancelSale=(skuId)=>request({
    url:`/admin/product/cancelSale/${skuId}`,
    method:'get'
})
//显示sku详情   GET /admin/product/getSkuById/{skuId}   参数skuId
export const reqGetSkuById=(skuId)=>request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get'
})