// 这个文件专门添加与用户相关操作的api

import axios from "@/utils/request";
// 用户登录
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
// 用户注册
export const userRegister=(data)=>{
    return axios({
        method:'post',
        url:'/register',
        data
    })
}