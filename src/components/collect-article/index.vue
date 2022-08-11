<template>
    <van-icon 
    :color="value ? '#ffa500' : '#777'" 
    :name="value ? 'star' : 'star-o'" 
    @click="onCollect"
    :loading="loading"
    />
</template>

<script>
import {addCollect,deleteCollect} from '@/api/artical'
export default {
   name:'CollectArticle',
   components:{},
   props:{
    value:{
        type:Boolean,
        required:true
    },
    articleId:{
        type:[Number,Object,String],
         required:true
    }
   },
   data(){
    return{
        loading:false
    }
   },
   computed:{},
   created(){},
   mounted(){},
   watch:{},
   methods:{
   async onCollect(){
        this.loading = true
        try{
           if(this.value){
            // 已收藏  取消收藏
           const {data}= await deleteCollect(this.articleId)
           console.log(data);
           }else{
            // 为收藏  收藏
            const {data}=  await addCollect(this.articleId)
             console.log(data);
           }
        //    自定义事件修改数据并不是立即的   需要取饭
           this.$emit('input',!this.value)
           this.$toast.success(this.value ? '取消收藏' : '收藏成功')
        }
        catch(err){
            this.$toast.fail('操作失败 请重试！')
        }
        this.loading = false
    }
   }
}
</script>

<style scoped lang="less">

</style>