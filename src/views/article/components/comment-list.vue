<template>
<!-- 
  只有List在可视范围内才会检查滚动位置触发onLoad
 -->
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"   
      @load="onLoad"
      :immediate-check="false"
    >
      <CommentItem v-for="(item,index) in list" 
      :key="index" 
      :comment = "item"
      @reply-click="$emit('reply-click',$event)"
      />
    </van-list>
  </div>
</template>

<script>
import {getComment} from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    source:{
      type:[String,Object,Number],
      required:true,
    },
    list:{
      type:Array,
      default:function(){
        return []
      }
    },
    type:{
      type:String,
      validator(value){  //参数就是propt的值  这个值必须是a或者c
       return['a','c'].includes(value)
      },
      default:'a',
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:20,
      error:false
    };
  },
  computed: {},
  created() {
    // 当你手动初始loading的时候他不会自动初始loading
    this.loading = true
    this.onLoad()
  },
  mounted() {},
  watch: {},
  methods: {
  async  onLoad() {
      try{
        // 获取数据
        // 获取评论和评论回复接口一样，接口参数不一样
        // type  a文章评论   c评论的回复
        // source 文章的评论：传递文章id  评论的回复：传递评论的id
       const {data} = await getComment({
         type:this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
         source:this.source.toString(),//源id，文章id或评论id
         offset:this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
         limit:this.limit,//获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
       })
      //  把数据放到list里面
       const {results} = data.data
       this.list.push(...results)
       this.$emit('onload-success',data.data)
      // 关闭加载
       this.loading = false
      //  判读是否有数据 有更新下一页的数据页码
      // 没有的话fishined = true 结束
      if(results.length){
        this.offset = data.data.last_id
      }else{
        this.finished = true
      }
       console.log(data)
      }catch(err){
        this.error = true
        this.loading = false
        // this.$toast('获取评论失败')
      }
    
    },
  },
};
</script>

<style scoped lang="less">
</style>