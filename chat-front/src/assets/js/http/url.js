import Vue from "vue";

const url = {
  用户列表: "/user",
  好友列表: "/my_all_friend",
  所有好友列表: "/friend/list"
};

Vue.prototype.$url = url;
