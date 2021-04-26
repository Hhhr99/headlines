// 这个文件专门添加与 文章 相关操作的api访法
import axios from "@/utils/request";

// 1.获取栏目的文章数据
export const getPostList = (params) => {
    return axios({
            url: `/post`,
            params
    })
}
