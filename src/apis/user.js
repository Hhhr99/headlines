// 这个文件专门添加与用户相关操作的api

// 用户登录
import axios from "@/utils/request";

export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
export const userRegister=(data)=>{
    return axios({
        method:'post',
        url:'/register',
        data
    })
}