import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      username: '',
      password:'',
      api : "https://vue3-course-api.hexschool.io",
      path : "get-mydata",
    };
    
  },
  methods: {
    //登入
    login(e) {
       e.preventDefault();
  
       //送出資料
    const data ={
      username: this.username, 
      password: this.password
    }

    // 打Login Api
    axios.post(`${this.api}/admin/signin`, data).then((res) => {
      //console.log("===res===", res);

      if (res.data.success) {
        const { token,expired } = res.data

        //get Token 存到 Cookie
        document.cookie = `hexToken=${token};expires=${new Date(
          expired
        )}; path=/`;

        //登入成功後，導至產品頁
        window.location.href = "products.html";

      } else {
        //登入失敗
        alert(res.data.message);
      }
    });
    },
  },
}).mount('#app');
