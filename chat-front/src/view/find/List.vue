<template>
  <div class="find-container">
    <div class="banner">
      <img src="../../../static/images/center.png" class="banner" />
      <img src="../../../static/images/no-login.png" class="tx" />
      <router-link to="/findIndex" class="carmer">
        <a-icon type="camera" />
      </router-link>
    </div>
    <div style="padding:20px 15px;">
      <!--一条数据-->
      <div class="one-find flex" v-for="item in findList">
        <div class="nnn">
          <img
            src="../../../static/images/no-login.png"
            alt=""
            class="ttt"
            style="display:block;"
          />
          倩倩
        </div>
        <div class="flex1">
          <div class="message-info">
            {{ item.message }}
          </div>
          <div class="pic-list">
            <div class="pictt" v-for="pic in item.picArr">
              <img :src="pic" alt="" class="ttt" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      findList: []
    };
  },
  methods: {
    //获取动态列表
    getfindList() {
      this.$post("/findlist", {
        userId: sessionStorage.getItem("id")
      })
        .then(data => {
          this.findList = data.data.res;
          this.findList.forEach(item => {
            console.log("item", item.picArr);
            item.picArr = item.picArr.split(",");
          });
        })
        .catch(ree => {});
    }
  },
  mounted() {
    this.getfindList();
  }
};
</script>
<style scoped>
.pic-list {
  overflow: auto;
}
.find-container {
  padding-bottom: 50px;
}
.pictt {
  width: 30%;
  display: inline-block;
  float: left;
  margin: 8px 1.56%;
}
.pictt img {
  width: 100%;
  height: auto;
}
.ttt {
  width: 50px;
  height: 50px;
}
.nnn {
  float: left;
}
.message-info {
  clear: both;
  text-align: left;
}
.banner {
  width: 100%;
  height: auto;
  max-width: 560px;
  position: relative;
}
.tx {
  position: absolute;
  width: 80px;
  height: 80px;
  bottom: 0;
  right: 0;
  border-radius: 100%;
}
.one-find {
  clear: both;
}
.carmer {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 30px;
  color: #fff;
}
</style>
