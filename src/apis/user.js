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
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}

// 用户详细
export const getUserDetail = (id) => {
    return axios({
        url: `/user/${id}`,
        // headers: {Authorization : localStorage.getItem('token')}
    })
}

// 编辑用户头像
export const uploadUserInfo = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}

// 5.关注用户
export const followUser = (id) => {
    return axios({
        url: `/user_follows/${id}`
    })
}


// 6.取消关注用户
export const unFollowUser = (id) => {
    return axios({
        url: `/user_unfollow/${id}`
    })
}

// 7.获取用户关注列表数据
export const getUserFollows = () => {
    return axios({
        url: `/user_follows`
    })
}

// 8.获取用户收藏列表数据
export const getUserStars = () => {
    return axios({
        url: `/user_star`
    })
}