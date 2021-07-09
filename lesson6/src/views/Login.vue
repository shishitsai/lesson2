<template>
  <div class="container mt-5">
    <form class="form-signin">
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="username"
          placeholder="name@example.com"
          required
          autofocus
          v-model="username"
        />
        <label for="username">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
          v-model="password"
        />
        <label for="password">Password</label>
      </div>
      <button
        class="btn btn-lg btn-primary w-100 mt-3"
        type="button"
        @click="login"
      >
        登入
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    //登入
    login(e) {
      e.preventDefault();
      //送出資料
      const data = {
        username: this.username,
        password: this.password,
      };
      //打Login Api
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, data)
        .then((res) => {
          //console.log("===res===", res);

          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

            this.$router.push("/admin/products");
          } else {
            alert(res.data.message);
          }
        });
    },
  },
};
</script>
