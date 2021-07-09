<template>
  <div>
    <h1>後台頁面</h1>
    <div id="nav">
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: "Dashboard",
  data() {
    return {
      checkSuccess: false,
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      //get token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      //存token 值
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;

        const api = `${process.env.VUE_APP_API}/api/user/check`;

        this.$http.post(api).then((response) => {
          if (response.data.success) {
            this.checkSuccess = true;
          } else {
            alert(response.data.message);
            this.$router.push("/login");
          }
        });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
    signout() {
      document.cookie = "hexToken=;expires=;";
      alert("token 已清除");
      this.$router.push("/login");
    },
  },
};
</script>
