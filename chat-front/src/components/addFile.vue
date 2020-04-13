<template>
  <a-upload
    name="file"
    :supportServerRender="true"
    :multiple="true"
    action="/upload"
    :headers="headers"
    :data="formData"
    :beforeUpload="beforeUpload"
    :disabled="allowUpload"
    :fileList="fileList"
    :remove="handleRemove"
    listType="picture-card"
    @change="handleChange"
  >
    <div v-if="fileList.length < 8">
      <a-icon type="plus" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script>
export default {
  name: "",
  props: {
    communityDID: {
      type: Number | String,
      default: ""
    },
    token: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      allowUpload: false,
      formData: {
        name: "",
        wn: ""
      },
      headers: {
        authorization: "authorization-text"
      },
      fileList: [],
      addFile: {
        url: ""
      }
    };
  },
  methods: {
    handleRemove(file) {
      this.fileList = [];
    },
    beforeUpload(info) {
      console.log("上传文件", info);
      this.fileList = [...this.fileList, info];
      this.formData.name = info.name;
      this.formData.wn = info;
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-2);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.data.res.url;
          console.log("file.response.res.url", file.response.data.res.url);
          this.addFile.url = file.response.data.res.url;
          this.$emit("fileUrlMethod", this.addFile);
        }
        return file;
      });
      this.fileList = fileList;
      //上传七牛云
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
