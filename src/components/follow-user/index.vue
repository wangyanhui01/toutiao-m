<template>
    <van-button
      v-if="value"
      class="follow-btn"
      round
      size="small"
      @click="onFollow"
      :loading="loading"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollow"
      :loading="loading"
      >关注</van-button
    >
</template>

<script>
import {addFollow,deleteFollow} from '@/api/user'

export default {
  name: "FollowUser",
  components: {},
  props: {
    value:{
        type:Boolean,
        required:true,
    },
    userId:{
      type:[Number,String,Object],
      required:true,
    }
  },
  data() {
    return {
        loading:false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
     async onFollow(){
    this.loading = true
      try{
        if(this.value){
          // 已关注  取消关注
         await deleteFollow(this.userId)
        //  console.log(data)
          // this.article.is_followed = false
        }else{
          // 未关注  则关注
        await addFollow(this.userId)
        //  console.log(data)
          // this.article.is_followed = true
        }
        // this.isFollowed = !this.isFollowed   通知父组件修改 isFollowed
        // this.$emit('update-is_followed',!this.value)
        this.$emit('input',!this.value)
      }
      catch(err){
        let message = '操作失败请重试'
        if(err.response && err.response.status === 400){
           message = "你不能关注你自己"
        }
        this.$toast(message)
      }
      this.loading = false
    },
  },
};
</script>

<style scoped lang="less">
</style>