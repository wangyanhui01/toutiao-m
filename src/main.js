import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// vant 引入全部样式
import Vant from 'vant';
import 'vant/lib/index.css';

// 动态设置人基准值
import 'lib-flexible'

// 加载dayjs配置
import '@/utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
