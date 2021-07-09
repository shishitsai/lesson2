<template>
  <div class="home">
    <h1>前台頁面</h1>
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/productstore">前台產品列表</router-link> |
      <router-link to="/cart">前台購物車</router-link> |
      <router-link to="/login">登入後台</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
