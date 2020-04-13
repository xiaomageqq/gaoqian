<template>
  <div>
    <h2>用户列表</h2>
    <table>
      <tr>
        <th>序号</th>
        <th>用户名</th>
        <th>密码</th>
      </tr>
      <tr v-for="(item, index) in list">
        <td>{{ index + 1 }}</td>
        <td>{{ item.user }}</td>
        <td>{{ item.psd }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },

  methods: {
    getUserList() {
      this.$get(this.$url.用户列表, {})
        .then(data => {
          this.list = data.data.list;
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>
<style></style>
