<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow=""
      @click-left="$router.back()"
    ></van-nav-bar>

<!-- 上传文件图片的表单  先隐藏 然后使用cilck绑定让它被点击 -->
    <input 
    type="file" 
    hidden 
    ref="file"
    @change="onFileChange"
    > 
    <!-- 个人信息 -->
    <van-cell 
    title="头像" 
    is-link
    @click="$refs.file.click()"
    >
      <van-image 
      class="avatar" 
      :src="user.photo" round />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdatNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '女' : '男'"
      @click="isUpdatGenderShow = true"
    />
    <van-cell 
    title="生日" 
    is-link 
    :value="user.birthday" 
    @click="isUpdatBirthdayShow = true"/>

    <!-- 修改姓名弹出层 -->
    <van-popup
      v-model="isUpdatNameShow"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdatNameShow"
        v-model="user.name"
        @close="isUpdatNameShow = false"
      ></UpdateName>
    </van-popup>
    <!-- /修改姓名弹出层 -->

    <!-- 修改性别弹出层 -->
    <van-popup
      v-model="isUpdatGenderShow"
      :style="{ height: '40%' }"
      position="bottom"
    >
      <UpdateGender
        v-if="isUpdatGenderShow"
        @close="isUpdatGenderShow = false"
        v-model="user.gender"
      ></UpdateGender>
    </van-popup>
    <!-- /修改性别弹出层 -->
    <!-- 修改生日的弹层 -->
    <van-popup
      v-model="isUpdatBirthdayShow"
      :style="{ height: '40%' }"
      position="bottom"
    >
      <UpdateBirthday
        v-if="isUpdatBirthdayShow"
        @close="isUpdatBirthdayShow = false"
        v-model="user.birthday"
      ></UpdateBirthday>
    </van-popup>
    <!-- /修改生日的弹层 -->

    <!-- 修改头像的弹层 -->
    <van-popup
      v-model="isUpdatPhotoShow"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <UpdatePhoto
        v-if="isUpdatPhotoShow"
        @close="isUpdatPhotoShow = false"
        v-model="user.photo"
        :img="img"
      ></UpdatePhoto>
    </van-popup>
    <!-- /修改头像的弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhoto from "./components/update-photo.vue";
export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  props: {},
  data() {
    return {
      user: {},
      isUpdatNameShow: false, //展示修改姓名弹出层
      isUpdatGenderShow: false, // 展示修改性别弹出层
      isUpdatBirthdayShow:false, //修改生日的弹层展示
      isUpdatPhotoShow:false,
      img:null,
    };
  },
  computed: {},
  created() {
    this.loadUserProfile();
  },
  mounted() {},
  watch: {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        this.user = data.data;
      } catch (err) {
        this.$toast("获取用户信息失败");
      }
    },
    onFileChange(){
        // 获取文件对象
        const file = this.$refs.file.files[0]
        // 基于文件对象获取blob数据，设置给图片
      const data =  window.URL.createObjectURL(file)
    //   console.log(data)
      this.isUpdatPhotoShow = true
      this.img = data
    //   如果选择了同一个文件，改时间不会触发了，解决办法就是每次使用完毕把value清空
    this.$refs.file.value =''
    }
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .van-icon-arrow-left {
    color: #fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>