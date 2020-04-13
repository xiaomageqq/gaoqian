<template>
  <div>
    <div class="name-title">
      <router-link :to="{ name: 'friendList' }">
        <van-icon name="arrow-left" class="return-back" />
      </router-link>
      <p class="name-text">{{ friendName }}</p>
    </div>
    <div class="content" id="chat"></div>
    <div class="bottom-input flex">
      <van-field v-model="value" placeholder="请输入用户名" class="flex1" />
      <van-button type="warning" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      ws: "",
      userId: sessionStorage.getItem("id"),
      friendId: JSON.parse(sessionStorage.getItem("friend")).frined_id,
      friendName: JSON.parse(sessionStorage.getItem("friend")).friend_name
    };
  },
  methods: {
    makeConnection() {
      //创建链接
      this.ws = new WebSocket(
        "ws:localhost:9000/?" + this.userId + ":" + this.friendId
      );
      this.ws.open = function() {
        //打开链接
      };
      this.ws.onmessage = function(e) {
        var content = document.getElementById("chat");
        var newMessage = document.createElement("p");
        newMessage.className = "accepet";
        newMessage.innerHTML = "<span>" + e.data + "</span>";
        content.appendChild(newMessage);
      };
    },
    sendMessage() {
      //添加元素
      var content = document.getElementById("chat");
      var newMessage = document.createElement("p");
      newMessage.className = "sendout";
      newMessage.innerHTML = "<span>" + this.value + "</span>";
      content.appendChild(newMessage);
      this.ws.send(this.value);
    }
  },
  mounted() {
    this.makeConnection();
  }
};
</script>
<style>
.sendout,
.accepet {
  maargin: 10px 0;
}
.sendout {
  text-align: right;
}
.accepet {
  text-align: left;
}
.sendout span {
  display: inline-block;
  background: green;
  padding: 5px 10px;
  color: #fff;
}
.accepet span {
  display: inline-block;
  background: red;
  padding: 5px 10px;
  color: #fff;
}
.content {
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 50px;
  padding: 20px;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.name-text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 0;
  left: 0;
  color: #fff;
}
.name-title {
  position: relative;
  height: 45px;
  line-height: 45px;
  background: #1890ff;
  text-align: left;
}
.return-back {
  font-size: 20px;
  line-height: 45px;
  color: #fff;
  position: relative;
  z-index: 9;
}
.bottom-input {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
