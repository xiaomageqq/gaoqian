<template>
  <div>
    <div class="register-container">
      <h1>登录</h1>
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <van-button type="info" @click="login">登录</van-button>
      <router-link :to="{ path: '/register' }">
        <van-button type="default">注册</van-button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$post("/login", {
        user: this.username,
        psd: this.password
      })
        .then(data => {
          sessionStorage.setItem("username", data.info.user);
          sessionStorage.setItem("id", data.info.id);
          this.$router.push({ name: "friendList" });
        })
        .catch(err => {
          console.log(err);
          console.log("网络请求失败");
        });
    }
  }
};
</script>
<style>
.register-container {
  width: 100%;
  max-width: 450px;
  margin: 150px auto 0;
}
</style>
