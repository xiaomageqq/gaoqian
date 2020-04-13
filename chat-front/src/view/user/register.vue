<template>
  <div class="register-container">
    <h1>用户注册</h1>
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
    <van-button type="info" @click="register">注册</van-button>
    <router-link :to="{ path: '/' }">
      <van-button type="default">返回登录</van-button>
    </router-link>
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
    register() {
      this.$post("/regster", {
        user: this.username,
        psd: this.password
      })
        .then(() => {
          alert("注册成功！");
        })
        .catch(() => {});
    },
    login() {
      this.$post("/login", {
        user: this.username,
        psd: this.password
      })
        .then(() => {
          alert("登录成功！");
        })
        .catch(() => {});
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
