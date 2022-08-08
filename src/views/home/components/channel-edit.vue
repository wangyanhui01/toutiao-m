<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round=""
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in channels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          name="clear"
          slot="icon"
          class=""
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="onAddChannel(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { GetAllChannel } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
import { addUserChannel, deleteUserChannel } from "@/api/channel";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    channels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], //所有频道
      isEdit: false, //控制编辑状态的显示
      fiexChannels: [0, 11], //固定频道不能删除
    };
  },
  computed: {
    ...mapState(["user"]),
    // recommendChannels () {
    //     const rechannels = []  //推荐频道
    //     // 遍历全部频道，跟我的频道对比  把不属于我的频道的拿出来 放在推荐频道里面
    //     this.allChannels.forEach(channel => {
    //        const ret = this.channels.find(myChannel => {
    //             return myChannel.id === channel.id
    //         })
    //         // 如果不包含的则收集到下面的频道中
    //         if(!ret){
    //            rechannels.push(channel)
    //         }
    //     })
    //     return rechannels
    // }

    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.channels.find((myChannel) => myChannel.id === channel.id);
      });
    },
  },
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await GetAllChannel();
        console.log(data);
        this.allChannels = data.data.channels;
      } catch (err) {
        // console.log('获取频道列表失败',err);
        this.$toast("数据获取失败");
      }
    },
    async onAddChannel(channel) {
      // console.log(channel)
      console.log(this.channels);
      this.channels.push(channel);
      //  数据持久化处理
      if (this.user) {
        // 已登录  把数据请求接口放到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.channels.length,
          });
        } catch (err) {
          this.$toast("保存失败");
        }
      } else {
        // 未登录 存储到本地

        setItem("TOUTIAO_CHANNELS", this.channels);
      }
    },
    onMyChannelClick(channel, index) {
      //  console.log(channel, index)

      if (this.isEdit) {
        // 固定的不能删除
        if (this.fiexChannels.includes(channel.id)) {
          return;
        }
        this.channels.splice(index, 1);
        // 如果是编辑状态，执行删除频道，
        if (index <= this.active) {
          this.$emit("update-ative", this.active - 1, true);
        }

        // 处理删除持久化存储数据
        this.deleteChannels(channel);
      } else {
        // 非编辑状态 执行切换频道
        this.$emit("update-ative", index, false);
      }
    },

    async deleteChannels(channel) {
      try {
        if (this.user) {
          //  已登录 则把数据更新到后台 请求接口
          await deleteUserChannel(channel.id);
        } else {
          //  未登录  更新到本地
          setItem("TOUTIAO_CHANNELS", this.channels);
        }
      } catch (err) {
        this.$toast("删除失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0 !important;
      }
      .active {
        font-size: 32px;
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-grid-item__content {
        .van-icon-clear {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 5;
        }
      }
    }
  }
}
</style>