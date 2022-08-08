<template>
  <div class="search-history">
    <van-cell title="搜索历史">
     
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        <span style="margin-left:20px" @click="isDeleteShow=false">完成</span>
      </div>
       <van-icon name="delete" v-else @click="isDeleteShow=true"/>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index" 
      @click="onSearchItemClick(item,index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    // searchHistories是props数据  
    // 如果是普通数据，类似数字，字符串 布尔值，绝对不能修改，即便改了也不回传给父组件
    // 如果是数组或者对象，只能修改 不能重新赋值例如 ***=[] 不行

    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch:{},
  methods: {
    onSearchItemClick(item,index){
      if(this.isDeleteShow){
        // 删除历史数据
        this.searchHistories.splice(index,1)
      }else{
        // 非删除状态，直接进入搜索
        this.$emit('search',item)
      }
    }
  },
};
</script>

<style scoped lang="less">
</style>