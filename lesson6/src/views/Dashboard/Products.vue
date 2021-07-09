<template>
  <div class="container">
    <div class="text-end mt-4">
      <!-- <button class="btn btn-primary" type="button" @click="openProduct('add')">
        建立新的產品
      </button> -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="200" class="text-center">分類</th>
          <th width="200" class="text-center">產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="120" class="text-center">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productData" :key="index">
          <td class="text-center">{{ item.category }}</td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.origin_price }}</td>
          <td class="text-center">{{ item.price }}</td>
          <td class="text-center">
            <label class="form-check-label">{{
              item.is_enabled ? "啟用" : "未啟用"
            }}</label>
          </td>
          <!-- <td class="text-center">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openProduct('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                @click="openProduct('del', item)"
                class="btn btn-outline-danger btn-sm"
              >
                刪除
              </button>
            </div>
          </td> -->
        </tr>
      </tbody>
    </table>
    <!---------- 分頁 ---------->
    <pagination :pages="paginations" @emit-pages="getProductList"></pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Products",
  props: ["token"],
  data() {
    return {
      productData: [],
      page: 1,
      getProDuctData: {
        title: "",
        imageUrl: "",
        imagesUrl: [],
        category: "",
        price: 0,
        origin_price: 0,
        unit: "",
        description: "",
        content: "",
        is_enabled: 0,
        action: "",
      },
      paginations: {},
      isNew: false,
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    //get token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //存token 值
    this.$http.defaults.headers.common.Authorization = token;

    //商品列表
    this.getProductList();
  },
  methods: {
    getProducts(page = 1) {
      // API
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        } else {
          alert(response.data.message);
        }
      });
    },
    //取得商品列表
    getProductList(value) {
      //目前第幾頁
      const current_page = value ? value : this.page;

      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${current_page}`;

      //打Api取資料
      this.$http.get(url).then((res) => {
        //console.log("===res===", res);

        if (res.data.success) {
          //商品資料
          this.productData = res.data.products;
          this.paginations = res.data.pagination;
        } else {
          //取資料失敗
          this.productData = [];
          this.paginations = {};
        }
      });
    },
  },
  created() {
    // this.getProducts();
  },
};
</script>
