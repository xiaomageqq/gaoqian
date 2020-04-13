<template>
  <div class="upload-container">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="150"
      placeholder="请输入留言"
      show-word-limit
    />
    <div class="uploadPic">
      <add-file @fileUrlMethod="getFileUrl"></add-file>
    </div>

    <div style="margin: 16px;">
      <van-button round block type="info" @click="uploadFile">
        提交
      </van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import addFile from "@/components/addFile";
export default {
  components: {
    addFile
  },
  data() {
    return {
      fileList: [],
      message: ""
    };
  },
  methods: {
    upt() {
      console.log(1);
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      this.$post(
        "/upload",
        { file: file },
        "headers:{'Content-Type':'multipart/form-data'}"
      )
        .then(() => {
          alert("注册成功！");
        })
        .catch(() => {});
    },
    uploadFile() {
      this.$post("/dynamic", {
        fileList: this.fileList,
        message: this.message,
        userId: sessionStorage.getItem("id")
      })
        .then(() => {
          Dialog.alert({
            title: "发布成功",
            message: ""
          }).then(() => {
            this.$router.push("/findList");
          });
        })
        .catch(() => {});
    },
    getFileUrl(obj) {
      this.fileList.push(obj.url);
    }
  },
  mounted() {
    console.log("支持");
  }
};
</script>
<style>
.upload-container {
  padding: 20px;
}
.uploadPic {
  margin-top: 30px;
}
</style>
