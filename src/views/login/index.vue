<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登陆">
    <van-icon name="cross" slot="left" color="#fff" @click="$router.back()"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-cell-group inset>
        <van-field
          name="mobile"
          placeholder="请输入手机号"
          v-model="user.mobile"
          :rules="useFormRules.mobile"
          type="number"
          maxlength="11"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field name="code" 
        placeholder="请输入验证码" 
        v-model="user.code"
        :rules="useFormRules.code" 
        type="number"
        maxlength="6"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

          <template #button>
            <!--time倒计时 -->
            <van-count-down :time="1000 * 5" format="ss s" v-if="isCountDownShow" 
            @finish="isCountDownShow = false"
            />
            <van-button size="small" 
            type="default" 
            @click="onSendSms"
            round class="send-sms-btn"
            native-type="button" 
            v-else
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="primary" native-type="submit">
          登陆
        </van-button>
      </div>
    </van-form>

    <p>默认账号:13911111111 验证码:246810</p>
  </div>
</template>

<script>
// 表单校验规则https://vant-contrib.gitee.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
import { login , sendSms} from "@/api/user";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "", // 短信验证码
      },
      useFormRules: {
        mobile: [
          {
            required: true,
            message: "请填写用户名",
          },
          {
            pattern: /^1[3|5|6|7|8]\d{9}$/,
            message: "手机号码不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow:false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 获取表单数据
      const user = this.user;

      // 表单验证
      // 在组件中必须用this.$toast来调用 Toast组件
      this.$toast.loading({
        message: "登陆中...",
        forbidClick: true,
        duration: 0, //禁用背景点击  持续时间默认两秒 如果为0 则持续展示
      });

      // 提交表单请求登陆
      try {
        const { data } = await login(user);
        this.$store.commit('setUser' , data.data)
        // console.log("登陆成功", res);
        this.$toast.success("登陆成功");
        // 登陆成功  跳转回原来页面 目前这个不严谨 后期优化
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("手机号或者验证码错误");
          this.$toast.fail("手机号或者验证码错误");
        } else {
          // console.log("登陆失败,请稍后重试", err);
          this.$toast.fail("登陆失败,请稍后重试");
        }
      }
      // 根据请求响应结果 处理后续操作
      //
    },
   async onSendSms () {
      //  校验手机号码   给表单添加ref  然后取得表单里面的name进行验证
     try {
       await this.$refs.loginForm.validate("mobile")
       console.log('验证通过')
     }
     catch(err) {
        console.log('验证失败',err)
        return
     }
      // 验证通过  倒计时
  this.isCountDownShow = true
      // 请求发送验证码
   try {
    const res = await sendSms(this.user.mobile)
     console.log('发送成功',res)
   }
   catch(err) {
    // 发送失败时候就不要倒计时了
    this.isCountDownShow = false
    // 429意思是接口繁忙  取不到数据
     if(err.response.status === 429){
       this.$toast('发送太频繁了，稍后再试')
     } else {
      this.$toast('发送失败，请稍后重试')
     }
   }
      // 
    }
  },
};
</script>

<style scoped lang="less">
.login-container {
  .van-form {
    margin-top: 20px;
    .van-cell-group {
      background-color: transparent;
      .van-cell.van-field {
        padding: 20px 0;
        background-color: transparent;
        .toutiao {
          font-size: 37px;
        }
        .send-sms-btn {
          width: 160px;
          height: 46px;
          background-color: #ededed;
          color: #666;
          line-height: 46px;
          font-size: 18px;
        }
      }
    }

    .login-btn-wrap {
      padding: 53px 33px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
      }
    }
  }
}
</style>
