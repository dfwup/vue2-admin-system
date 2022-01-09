import request from '@/utils/request'
//获取spu列表数据的接口
//GET /admin/product/{page}/{limit}     参数page,limit,category3Id
export const reqSpuList=(page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit} `,
    method:'get',
    params:{category3Id}//category3Id没有在路径中出现，用params参数携带，key-value一致，省略value
})