<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            :src="userInfo.photo"
            class="avatar"
            fit="cover"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round="">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登录注册</span>
      </div>
    </div>

    <!-- 收藏宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">关注</span>
      </van-grid-item>
    </van-grid>

    <!-- 下面的cell -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      title="退出登录"
      class="logout-cell"
      v-if="user"
      @click="onLogout" 
      clickable=""
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from '@/api/user'
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo:{},
    };
    
  },
  computed: {
    ...mapState(["user"]),
  },
  // watch: {},
  created(){
    if(this.user){
       this.loadUserInfo()
    }
  },
  // mounted: {},
  methods: {
    onLogout() {
      // console.log('onLogout');
      // 退出提示
      this.$dialog.confirm({
        title: "确认退出吗",
      })
        .then(() => {
          console.log('确认执行这里');
          // 确认退出，清楚登陆状态，删除容器中的user和本地存储的user
          this.$store.commit('setUser',null)
        })
        .catch(() => {
           console.log('取消执行这里');
        })
      
    },
    async loadUserInfo(){
       try{
         const {data} = await getUserInfo()
         console.log(data)
         this.userInfo = data.data
       }
       catch(err){
         this.$toast('获取数据失败，请稍后重试')
       }
    }
  },
};
</script>
  
<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }

  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      height: 231px;
      // background-color: pink;
      .left {
        display: flex;
        align-items: center;
        span {
          color: #fff;
          font-size: 28px;
          margin-left: 23px;
        }
        .avatar {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
        }
      }
      .right {
        .van-button {
          padding: 0 10px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          color: #fff;
          font-size: 36px;
        }
        .text {
          color: #fff;
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
        margin-top: 10px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #eb5253;
  }
}
</style>