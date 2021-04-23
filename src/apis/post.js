// 这个文件专门添加与 文章 相关操作的api访法
import axios from "@/utils/request";

export const getPostList = (category) => {
    return axios({
        url: `/post?category=${category}`
    })
}
