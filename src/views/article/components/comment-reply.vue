<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList>
    </div>

    <!-- 发布回复的评论 -->
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="isPostShow = true">写评论</van-button>
    </div>

     <!-- 发布评论弹层 -->
      <van-popup v-model="isPostShow" position="bottom" >
        <CommentPost
        :target="comment.com_id" 
        @post-success="onPostSuccess"
        ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  inject: {
    articleId:{
        type: [Number, String, Object],
        default:null
    }
    },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
        isPostShow:false,
        commentList:[] //评论回复列表
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onPostSuccess(data){
    //    更新回复数量
    this.comment.reply_count++
    // 关闭弹层
    this.isPostShow = false
    // 把数据加到回复的顶部
    this.commentList.unshift(data.new_obj)
    }
  },
};
</script>

<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.scroll-wrap{
 position: fixed;
 top:92px;
 left:0;
 right: 0;
 bottom:88px;
 overflow-y: auto;
}
</style>