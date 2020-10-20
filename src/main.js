import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

/* 
    对scroll插件进行封装，
    调用时，通过父子组件传参、调用方法
    数据通过axios异步获取
    refresh有两种方法，第一种在app中通过nextTick，第二种在scroll中通过watch
*/
