//获取品牌列表 GET /admin/product/baseTrademark/{page}/{limit}  参数：当前页,每页显示个数
import request from '@/utils/request'
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

//添加品牌 POST /admin/product/baseTrademark/save   服务器生成id  参数： 名称  logo
// 修改品牌 PUT /admin/product/baseTrademark/update     参数：名称，logo，id
export const reqAddOrUpdateTradMark = (tradeMark) => {
    if (tradeMark.id) {
        //修改
        return request({
            url: '/admin/product/baseTrademark/update ',
            method: 'put',
            data:tradeMark
        })
    } else {
        //上传
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data:tradeMark
        })
    }
}
//删除品牌接口  DELETE   /admin/product/baseTrademark/remove/{id}   参数id

export const reqDeleteTradeMark=(id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete'
})