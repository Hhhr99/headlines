// 这个文件专门添加与 文章 相关操作的api访法
import axios from "@/utils/request";

// 1.获取栏目的文章数据
export const getPostList = (params) => {
    return axios({
        url: `/post`,
        params
    })
}

// 2.获取指定id的文章的详情数据
export const getPostDetail = (id) => {
    return axios({
        url: '/post/' + id
    })
}

// 3.点赞文章
export const likePost = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}

// 4.收藏文章
export const starPost = (id) => {
    return axios({
        url: '/post_star/' + id
    })
}

// 5.获取文章的评论数据
export const getPostComment = (id) => {
    return axios({
        url: '/post_comment/' + id,
        params: {
            pageSize: 10
        }
    })
}

// 6.发表+回复 文章评论
export const publishComment = (id, data) => {
    return axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}