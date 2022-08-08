<template>
  <div class="home-container">
    <!-- 标题栏 带搜索图标 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        class="search-btn"
        to="/search"
      >
        <template>
          <van-icon name="search" size="20" color="#fff" />
        </template>
        搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <!-- 通过 v-model:active 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs v-model:active="active" animated swipeable class="channel-tabs">
      <van-tab
        :title="channels.name"
        v-for="channels in channels"
        :key="channels.id"
      >
        <!-- 挂载文章列表 -->
        <AticalList :channel="channels"></AticalList>
      </van-tab>
      <div class="placehoder" slot="nav-right"></div>
      <div
        slot="nav-right"
        class="hanburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <ChannelEdit
        :channels="channels"
        :active="active"
        @update-ative="onUpdataActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import AticalList from "@/views/home/components/artical-list.vue";
import ChannelEdit from "@/views/home/components/channel-edit.vue";
import { mapState } from "vuex";
import {getItem} from '@/utils/storage'
export default {
  name: "HomeIndex",
  components: {
    AticalList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [], //频道列表
      isChannelEditShow: false, //控制频道弹出层的展示状态
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  // watch: {},
  created() {
    this.loadChannels();
  },
  // mounted: {},
  methods: {
    async loadChannels() {
      try {
        // const { data } = await getUserChannels();
        // //  console.log(data)
        // this.channels = data.data.channels;
        // 已登录，请求接口的数据
        let channels = [];
        if (this.user) {
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 未登录  请求本地存储的数据
          // 取到本地的数据  如果有 就用 没有的话  继续接口取接口数据
         const localChannels = getItem('TOUTIAO_CHANNELS')
         if(localChannels){
           channels = localChannels
         }else{
          const { data } = await getUserChannels();
          channels = data.data.channels;
         }
        }
        this.channels = channels;


      } catch (err) {
        console.log("获取频道数据失败");
      }
    },
    onUpdataActive(index, isChannelEditShow = true) {
      // 让点击的频道====首页显示的频道
      this.active = index;
      //  关闭弹层
      this.isChannelEditShow = isChannelEditShow;
    },
  },
};
</script>
  
<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
    }
  }
  // 或者>>>
  /deep/ .channel-tabs {
    // padding-right: 66px;

    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px !important;
      background-color: #3296fa;
      margin-bottom: 8px;
    }
    .placehoder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hanburger-btn {
      width: 66px;
      height: 82px;
      position: fixed;
      right: 0;
      background-color: #fff;
      opacity: 0.85;
      display: flex;
      justify-content: center;
      align-items: center;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>