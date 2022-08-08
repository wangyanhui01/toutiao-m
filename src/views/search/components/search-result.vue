<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 请求获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        // console.log(data)
        // 将数据添加到数据列表中
        const { results } = data.data;
        this.list.push(...results);
        // 将本次加载中的loading关闭
        this.loading = false;
        // 判断是都有数据
        if (results.length) {
          //  有数据，则更新获取下一个数据的页码
          this.page++;
        } else {
          // 如果没有  则开启finished 设置为结束

          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
        // this.$toast("获取数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>