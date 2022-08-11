// 请求模块封装
import axios from "axios";
import store from '@/store/index'
// import JSONBig from 'json-bigint'

// // 处理超出数据范围的数据
// const jsonStr = '{"aut_id":1245953273786007552}' 
// console.log(JSON.parse(jsonStr)) //1245953273786007600
// console.log(JSONBig.parse(jsonStr));  //0: 12459  1: 53273786007552 
// // 使用时 需要把BigNumber数据转成字符串
// console.log(JSONBig.parse(jsonStr).aut_id.toString());  //1245953273786007552
// // JSONBig.parse() 把json 格式的字符串转换为javascript对象
// // JSONBig.stringify()  反过来
// // 可以处理数据中超出范围的数据


const request = axios.create({
    // baseURL:'http://ttapi.research.itcast.cn/'
    baseURL:'http://toutiao.itheima.net/',
    // 自定义后端返回的数据   数据使用JSONBig处理
    // transformRequest: [function (data) {
    //   try{
    //     return JSONBig.parse(data)
    //   }
    //   catch(err){
    //     return data
    //   }
    
    // }],
  
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