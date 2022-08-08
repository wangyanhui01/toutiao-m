// 请求模块封装
import axios from "axios";
import store from '@/store/index'
const request = axios.create({
    // baseURL:'http://ttapi.research.itcast.cn/'
    baseURL:'http://toutiao.itheima.net/'
})

// 请求拦截器   https://github.com/axios/axios 复制来的
request.interceptors.request.use(function (config) {
    // Do something before request is sent 
    // 请求发起会经过这里，config配置对象  本次请求的请求配置对象
    const { user } = store.state
    if(user && user.token){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    // 这里务必要返回 否则请求就停在这里
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// 响应拦截器

export default request