<template>
  <div class="container">
    <div>
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar route>
        <van-tabbar-item replace to="/addFriend" icon="home-o">
          首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/allFriend" icon="friends-o">
          通讯录
        </van-tabbar-item>
        <van-tabbar-item replace to="/findList" icon="browsing-history-o">
          发现
        </van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search">
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style>
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
</style>
