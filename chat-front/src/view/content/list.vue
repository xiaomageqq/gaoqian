<template>
  <div>
    <div
      style="line-height:45px;font-size:15px;text-align:right;padding-right:20px;"
    >
      <router-link :to="{ path: 'addFriend' }">添加好友</router-link>
    </div>
    <ul class="list">
      <h2>好友列表</h2>
      <li v-for="item in list" :class="{ zhiding: item.ordr }">
        {{ item.user }}
        <span @click="roofPlacement(item)" class="plament" v-if="item.ordr == 0"
          >置顶</span
        >
        <span @click="cancelRoof(item)" class="plament" v-else>取消置顶</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      finished: true,
      visible: false
    };
  },

  methods: {
    getUserList() {
      this.$post(this.$url.所有好友列表, {})
        .then(data => {
          console.log("data", data);
          this.list = data.list;
        })
        .catch(() => {});
    },
    cancelRoof(item) {
      console.log("item", item);
      this.$post("/cancelroof", item)
        .then(data => {
          this.getUserList();
        })
        .catch(() => {});
    },
    roofPlacement(item) {
      this.$post("/placeroof", item)
        .then(data => {
          this.getUserList();
        })
        .catch(() => {});
    }
  },
  mounted() {
    //this.getUserList();
  }
};
</script>
<style>
.zhiding {
  background: #eee;
}
.list li {
  list-style: none;
  line-height: 35px;
  border-bottom: solid 1px #ddd;
  text-align: left;
  padding: 5px 20px;
  box-sizing: border-box;
}
.plament {
  float: right;
}
</style>
