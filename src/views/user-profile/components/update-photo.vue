<template>
  <div class="update-photo">
    <img :src="img" alt="" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user";
export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1, //查看模式  拖动狂只能在图片里面
      dragMode: "move", //拖动模式
      aspectRatio: 1, //截图比例  默认16/9
      autoCropArea: 1, //自动街区区域  一比一比例
      cropBoxMovable: false, //截图区域是否可以移动
      cropBoxResizable: false, //截图区域缩放
      background: false, // 背景 是透明的 不需要
      movable: true, // 背景图片是否可以移动
    });
    // console.log(cropper);
  },
  watch: {},
  methods: {
    onConfirm() {
        try{
               this.$toast.loading({
        message:'保存中',
        forbidClick:true, //无法点击
        duration:0 //持续展示
    })
      // 基于服务期端的 把cropper方法传给服务端
      //  console.log(this.cropper.getData());
      // 前端自己全部处理好后，把处理好的图片传给客户端
      this.cropper.getCroppedCanvas().toBlob(async(blob) => {
        console.log(blob);
        // 错误的用法
        // updateUserPhoto({
        //   photo:blob
        // })
        // 如果要求Content-Type	application/json 则传递普通对象

        // 如果接口要求Content-Type 是multipart/form-data   必须传递FormData 对象
        const formData = new FormData();

        // Pass the image file name as the third parameter if necessary.
        formData.append("photo", blob);
        const {data} = await updateUserPhoto(formData)
         console.log(data)
        //  关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('input',data.data.photo)
         // 提示成功
        this.$toast.success('修改成功')
      });
        }catch(err){
          this.$toast('修改失败')
        }
    },
  },
};
</script>

<style scoped lang="less">
.update-photo {
  height: 100%;
  background-color: #000;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 180px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>