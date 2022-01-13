import request from '@/utils/request'
// 一级分类 GET /admin/product/getCategory1 参数：无
export const reqGetCategory1List = () => request({
    url: '/admin/product/getCategory1',
    method: 'get'
})
//二级分类  GET /admin/product/getCategory2/{category1Id} 参数：category1Id
export const reqGetCategory2List = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
})
//三级分类  GET /admin/product/getCategory3/{category2Id}   参数：category2Id
export const reqGetCategory3List = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
})

//展示平台属性  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 
// 参数category1Id,category2Id,category3Id
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id} `,
    method:'get'
})

//添加属性名与属性值接口    POST /admin/product/saveAttrInfo    参数{}
export const reqAddOrUpdateAttrInfo=(data)=>request({
    url:'/admin/product/saveAttrInfo ',
    method:'post',
    data
})


