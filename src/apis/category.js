// 这个文件专门添加与 栏目 相关操作的api访法
import axios from "@/utils/request";

export const getCateList = () => {
    return axios({
        url: '/category'
    })
}