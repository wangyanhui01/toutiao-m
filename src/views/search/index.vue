<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 
    action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult 
    v-if="isResultShow" 
    :search-text="searchText"
    ></SearchResult>
    <!-- /搜索结果 -->

        <!-- 搜索联想建议 -->
     <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></SearchSuggestion>
    <!-- /搜索联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :searchHistories="searchHistories" 
    @clear-search-histories="searchHistories=[]" 
    @search="onSearch"
    ></search-history>
    <!-- /搜索历史记录 -->

 

   
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history.vue'
import SearchSuggestion from '@/views/search/components/search-suggestion.vue'
import SearchResult from '@/views/search/components/search-result.vue'
import { getItem, setItem } from '@/utils/storage';
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText:'',
      isResultShow:false, //控制搜索结果展示的
      searchHistories:getItem('SEARCH_HISTORIES') || [],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch:{
    searchHistories(value){
      setItem('SEARCH_HISTORIES',value)
    }
  },
  methods: {
    onSearch(val) {
      console.log(val)
      // 更新文本框内容
      this.searchText = val
      // 存储历史记录
      const index = this.searchHistories.indexOf(val)
      if(index !== -1){
        this.searchHistories.splice(index,1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
  },
};
</script>

<style scoped lang="less">
.search-container{
  padding-top: 108px;
  .van-search__action{
     color: #fff;
  }
  .search-form{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    z-index: 1;
  }
}
</style>