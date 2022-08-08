import Vue from 'vue'
import dayjs from 'dayjs'
// 配置语言 中文
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的配置
dayjs.extend(relativeTime)



dayjs.locale('zh-cn')

// 定制全局过滤器,就可以在任何组件中使用
// 过滤器就相当于一个全局可用的方法 仅供模板使用
// 使用方式 {{表达式 | 过滤器名称}}
Vue.filter('relativeTime',value => {
   return  dayjs().to(dayjs(value))
})
// 获取当前最新时间 试验一下
// console.log(dayjs().format('YYYY-MM-DD'))

// console.log(dayjs().from(dayjs('1992-03-01')));
// console.log(dayjs().to(dayjs('1990-01-01')));
// console.log(dayjs().toNow());