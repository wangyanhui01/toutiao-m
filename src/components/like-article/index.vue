<template>
  <div class="">
    <van-icon
      :color="value === 1 ? '#ffa500' : '#777'"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      @click="onLike"
      :loading="loading"
    />
  </div>
</template>

<script>
import {addLike,deleteLike} from '@/api/artical'
export default {
  name: "LikeArticle",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
     articleId:{
        type:[Number,Object,String],
         required:true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    async onLike() {
    //   console.log("om");
      this.loading = true;
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞  取消
          const { data } = await deleteLike(this.articleId);
          console.log(data);
        } else {
          // 未点赞  点赞
          const { data } = await addLike(this.articleId);
          status = 1
          console.log(data);
        }
        //    自定义事件修改数据并不是立即的   需要取饭
        this.$emit("input", status);
        this.$toast.success(this.value ===1? "取消点赞" : "点赞成功");
      } catch (err) {
        this.$toast.fail("操作失败 请重试！");
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
</style>