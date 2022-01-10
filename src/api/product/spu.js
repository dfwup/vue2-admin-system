import request from '@/utils/request'
//获取spu列表数据的接口
//GET /admin/product/{page}/{limit}     参数page,limit,category3Id
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit} `,
    method: 'get',
    params: { category3Id }//category3Id没有在路径中出现，用params参数携带，key-value一致，省略value
})

//根据id获取某一个spu信息  GET  /admin/product/getSpuById/{spuId}  参数：spuId
export const reqGetSpuInfo = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
})

//获取品牌接口  GET /admin/product/baseTrademark/getTrademarkList   无参数
export const reqGetTradeMarkList = () => request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
})

//获取SPU图片    GET /admin/product/spuImageList/{spuId} 参数：spuId
export const reqGetSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
})

//获取平台中全部的销售属性（3个） GET /admin/product/baseSaleAttrList   无参数
export const reqGetBaseSaleAttrList = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
})

//保存spu信息   POST /admin/product/saveSpuInfo     参数spuInfo
//更新spu信息   POST /admin/product/updateSpuInfo   参数 spuId
//整合成一个请求    参数    spuInfo
//修改SPU||添加SPU：对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数带有id----修改spu
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });
    } else {
        //携带的参数不带id---添加SPU
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
    }
}

