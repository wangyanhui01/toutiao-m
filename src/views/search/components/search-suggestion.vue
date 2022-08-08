<template>
  <div class="search-suggestion">
    <van-cell 
    v-for="(text,index) in suggestions" 
    :key="index"
     icon="search" 
     @click="$emit('search',text)"
     >
       <div v-html="hightlight(text)" slot="title"></div>
     </van-cell>
  </div>
</template>

<script>
import {getSearchSuggestion} from '@/api/search'
// 按需加载  用哪个加载哪个
import {debounce} from 'lodash'
export default {
   name:'SearchSuggestion',
   components:{},
   props:{
    searchText:{
        type:String,
        required:true,
    }
   },
   data(){
    return{
        suggestions:[]
    }
   },
   computed:{},
   watch:{
     searchText:{
        // 当searchText发生改变  handler是固定的语法规则函数

        // handler(value){
        //     // console.log(value);
        //     this.loadSearchSuggestion(value)
        // },

        handler:debounce(function(value){
             this.loadSearchSuggestion(value)
        },500),
        immediate:true,
     }
   },
   created(){},
   mounted(){},
   methods:{
    async loadSearchSuggestion(q){
        try {
          let {data} = await getSearchSuggestion(q)
          console.log(data)
          this.suggestions = data.data.options
        }
        catch(err){
            this.$toast('数据获取失败，请稍后后重试')
        }
        
     },
     hightlight(text){
        
        // 处理高亮数据
        // RegExp参数一是匹配字符串 解析出来他得值作为匹配数据  gi是模式
        const hightlightStr = `<span class="active">${this.searchText}</span>`
        const reg = new RegExp(this.searchText,'gi')
        // text有数据才会执行下一行 没有数据则不展示
        if(text){
            return text.replace(reg,hightlightStr)
        }
     }
   }
}
</script>

<style scoped lang="less">
  /deep/ span.active{
    color: #3296fa;
  }
</style>