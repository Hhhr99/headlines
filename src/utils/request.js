// 1.引入axios
import axios from 'axios'

// 2.添加默认配置，后期axios请求都会使用这个默认配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// const myaxios = axios.create({
//   baseURL: ''
// })

import { Toast } from 'vant'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config);
    // 在发送请求之前做些什么
    // 做点什么 ？设置token的请求头的传递
    // Authorization: localStorage.getItem('heimatoutiao_token')
    let token = localStorage.getItem('token')
    if (token) {
        // config.headers.Authorization = token
        config.headers['Authorization'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('经过了响应拦截器', response);
    if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
        Toast.fail('用户信息验证失败!')
        // this.$router.push({ name: 'login' })
        console.log('当前页面地址：', window.location.href);
        // console.log('当前页面路由地址：', window.location.hash); // 路由得是hash模式
        // 传递当前页面地址
        window.location.href = '#/login?redirect_url=' + window.location.href
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 3.暴露
export default axios

