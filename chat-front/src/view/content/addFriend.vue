<template>
  <div>
    <div class="search-conatiner flex">
      <van-search
        v-model="sear"
        class="flex1"
        placeholder="请输入搜索关键词"
        background="#1890ff"
      />
      <van-icon name="search" class="add-frined" @click="searchFriend" />
    </div>
    <div v-if="res.user">
      搜索结果为：
      <div @click="add = true">
        {{ res.user }}
      </div>
    </div>
    <ul>
      <li v-for="item in resList" class="friend-list flex">
        <span class="flex1">{{ item.user }}</span>
        <van-button type="warning">添加</van-button>
      </li>
    </ul>
    <div v-if="add">
      用户信息：名称：{{ res.user }}<br />
      <span @click="addFriend">添加好友</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sear: "",
      res: {},
      add: false,
      curUser: {},
      invationFriend: {},
      allFriend: [],
      resList: []
    };
  },
  methods: {
    searchFriend() {
      this.$post("/search_user", {
        sear: this.sear
      })
        .then(data => {
          this.resList = data.data.res;
        })
        .catch(() => {});
    },
    getAllFriend() {
      this.$post("/my_all_friend", {
        id: Number(sessionStorage.getItem("id")),
        status: ""
      })
        .then(data => {
          this.allFriend = data.data.res;
        })
        .catch(err => {});
    },
    addFriend() {
      if (this.res.id > this.curUser.id) {
        this.invationFriend = {
          user1: this.curUser.id,
          name1: this.curUser.username,
          type1: "1",
          type2: "0",
          user2: this.res.id,
          name2: this.res.user,
          status: "1"
        };
      } else {
        this.invationFriend = {
          user2: this.curUser.id,
          name2: this.curUser.username,
          user1: this.res.id,
          name1: this.res.user,
          status: "0",
          type1: "0",
          type2: "1"
        };
      }
      this.$post("/invitation", this.invationFriend)
        .then(data => {
          console.log("data", data);
          alert("好友申请已发送成功");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.curUser = {
      id: Number(sessionStorage.getItem("id")),
      username: sessionStorage.getItem("username")
    };
    this.getAllFriend();
  }
};
</script>
<style>
.friend-list {
  text-align: left;
  padding: 5px 10px;
  border-bottom: solid 1px #eee;
}
.waite {
  float: right;
}
.add-frined {
  font-size: 20px;
  color: #fff;
  line-height: 50px;
  margin-right: 10px;
}
</style>
