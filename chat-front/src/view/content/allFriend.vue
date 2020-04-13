<template>
  <div>
    <div class="search-conatiner">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#1890ff"
      />
    </div>
    <ul>
      <li v-for="item in allFriend" class="one-friend" @click="goChat(item)">
        {{ item.friend_name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allFriend: [],
      value: ""
    };
  },
  mounted() {
    this.getAllFriend();
  },
  methods: {
    getAllFriend() {
      this.$post("/friend/list", {
        id: Number(sessionStorage.getItem("id"))
      })
        .then(data => {
          this.allFriend = data.list;
        })
        .catch(err => {});
    },
    goChat(item) {
      sessionStorage.setItem("friend", JSON.stringify(item));
      this.$router.push("weichat");
    }
  }
};
</script>
<style>
.search-conatiner,
van-search {
  background: #1890ff;
}
.one-friend {
  border: solid 1px rgba(0, 0, 0, 0.05);
  line-height: 50px;
  text-align: left;
  font-size: 16px;
  padding-left: 20px;
}
</style>
