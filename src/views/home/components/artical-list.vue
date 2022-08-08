<template>
  <div class="artical-list">
    <!-- List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。 -->
    <!--  -->
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
      success-duration="1000"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticals } from "@/api/artical";
import  ArticleItem  from "@/components/article-item.vue";
export default {
  name: "ArticalList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], //存储数据列表的数组
      loading: false, //控制数据加载中loading的状态
      finished: false, //控制数据加载结束的状态
      timestamp: null,
      error: false,
      refreshing: false,
      refreshSuccessText: "刷新成功", //下拉刷新成功提示文本
    };
  },
  computed: {},
  created() {
    // this.onLoad()
  },
  mounted() {},
  methods: {
    // 初始化或者滚动到底部时候会触发调用onLoad
    // onLoad(){
    //     // console.log(this.onLoad)
    //     // 请求获取数据
    //     // setTimeout仅做示例，真实场景中一般为ajax请求
    //     setTimeout(() => {
    //         // 把请求结果放在list列表里面
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束  本次数据加载结束之后要把加载状态设置为结束
    //     this.loading = false;

    //     // 数据全部加载完成  要把结束状态设置为真实
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    async onLoad() {
      try {
        // 1请求获取数据
        // setTimeout仅做示例，真实场景中一般为ajax请求
        const { data } = await getArticals({
          channel_id: this.channel.id, //频道id
          timestamp: this.timestamp || Date.now(),
          //页码  时间戳  拥有请求之后数据的时间戳会在当前的请求结果中返回
        });
        // 模拟随即失败的代码
        //  if(Math.random() > 0.5){
        //     JSON.parse('bskjdjdkaljdka')
        //  }
        // 2把请求结果放在list列表里面
        // console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        // 3加载状态结束  本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;

        //4 数据全部加载完成  要把结束状态设置为真实
        if (results.length) {
          // 更新获取下一页
          this.timestamp = data.data.pre_timestamp;
          // console.log(this.timestamp)
        } else {
          this.finished = true;
        }
      } catch (err) {
        // console.log("请求数据失败", err);
        this.error = true;
        this.loading = false;
      }
      // console.log(this.onLoad)
    },
    // 下来刷新数据
    async onRefresh() {
      try {
        const { data } = await getArticals({
          channel_id: this.channel.id, //频道id
          timestamp: this.timestamp || Date.now(),
          //页码  时间戳  拥有请求之后数据的时间戳会在当前的请求结果中返回
        });

        // // 模拟随即失败的代码
        //  if(Math.random() > 0.3){
        //     JSON.parse('bskjdjdkaljdka')
        //  }

        this.list.unshift(...data.data.results);
        // 关闭下拉刷新状态
        this.refreshing = false;
        // 更新刷新下拉提示文本
        this.refreshSuccessText = `刷新成功，更新了${data.data.results.length}条数据`;
      } catch (err) {
        this.refreshing = false;
        this.refreshSuccessText = "刷新失败";
      }
      console.log("onRefresh");
      // 请求获取数据
      // 将数据放在列表的顶部
      // 关闭下拉刷新状态
    },
  },
};
</script>

<style scoped lang="less">
.artical-list {
  height: 79vh;
  overflow-y: auto;
}
</style>