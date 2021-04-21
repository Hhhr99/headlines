import axios from "@/utils/request";

export const uploadFile = (data) => {
    return axios({
        method: 'post',
        url: '/upload',
        data
    })
}