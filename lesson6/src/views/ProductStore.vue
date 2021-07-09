<template>
  <div class="product_store">
    <h1>前台商品頁</h1>

    <!-- 產品Modal -->
    <user-product-modal
      ref="userProductModal"
      :product="product"
      @add-cart="addCart"
    ></user-product-modal>
    <!-- 產品Modal -->

    <!-- 產品 List -->
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getProDuctList" :key="index">
          <td style="width: 200px">
            <div
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            >
              <img :src="item.imageUrl" style="width: 180px; height: 100px" />
            </div>
          </td>
          <td>{{ item.title }}</td>
          <td>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h5">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openProductDetail(item.id)"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingDetailProductId === item.id"
                ></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addCart(item.id)"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingAddProductId === item.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userProductModal from "@/components/UserProductModal.vue";
//import Pagination from '"@/components/Pagination.vue'; //分頁

export default {
  name: "Products",
  data() {
    return {
      //api: "https://vue3-course-api.hexschool.io",
      //path: "get-mydata",
      page: 1,
      getProDuctList: {
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
      product: {},
      paginations: {},
      getCartList: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      loadingDetailProductId: "",
      loadingAddProductId: "",
      loadingDelProductId: "",
      loadingDelAll: false,
      loadingBtn: false,
    };
  },
  components: {
    userProductModal,
  },
  created() {
    this.getProductList();
    //this.getCartData();
  },
  methods: {
    //取得商品列表
    getProductList(value) {
      //目前第幾頁
      const current_page = value ? value : this.page;
      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${current_page}`;
      //打Api取資料
      this.$http.get(url).then((res) => {
        //console.log("===res===", res);
        if (res.data.success) {
          //商品資料
          this.getProDuctList = res.data.products;
          //分頁
          //this.paginations = res.data.pagination;
        } else {
          //取資料失敗
          this.productData = [];
          this.paginations = {};
        }
      });
    },
    openProductDetail(id) {
      //商品詳情
      //console.log("===id===", id);
      //open loading
      this.loadingDetailProductId = id;
      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      //打Api取資料
      this.$http.get(url).then((res) => {
        console.log("===res-id===", res);
        if (res.data.success) {
          //此商品詳情資料
          this.product = res.data.product;
          this.$refs.userProductModal.openModal();
        } else {
          alert(res.data.message);
        }
        //close loading
        this.loadingDetailProductId = "";
      });
    },
    addCart(id, qty = 1) {
      //加入購物車

      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;

      //open loading
      this.loadingAddProductId = id;
      const data = { product_id: id, qty: qty };

      //打Api取資料
      this.$http.post(url, { data: data }).then((res) => {
        console.log("===res-add-cart===", res);
        if (res.data.success) {
          alert(res.data.message);

          //關閉商品詳情頁
          this.$refs.userProductModal.hideModal();

          //this.getCartData();
        } else {
          alert(res.data.message);
        }
        //close loading
        this.loadingAddProductId = "";
      });
    },
    updateCartData(value) {
      //更新購物車
      //console.log('-value-', value);
      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${value.id}`;
      //資料
      const data = {
        product_id: value.product_id,
        qty: value.qty,
      };
      //打Api取資料
      this.$refs.put(url, { data: data }).then((res) => {
        console.log("-res-update-cart-", res);
        if (res.data.success) {
          alert(res.data.message);
          this.getCartData();
        } else {
          alert(res.data.message);
        }
      });
    },
    delCartProdect(item) {
      //console.log('-del-item-', item);
      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      //open loading
      this.loadingDelProductId = item.id;
      this.$http.delete(url).then((res) => {
        console.log("-res-del-cart-", res);
        if (res.data.success) {
          alert(res.data.message);
          this.getCartData();
        } else {
          alert(res.data.message);
        }
        //close loading
        this.loadingDelProductId = "";
      });
    },
    delAllCart() {
      //刪除全部購物車
      //open loading
      this.loadingDelAll = true;
      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url).then((res) => {
        //console.log('-res-del-all-cart-', res);
        if (res.data.success) {
          alert(res.data.message);
          this.getCartData();
        } else {
          alert(res.data.message);
        }
        //close loading
        this.loadingDelAll = false;
      });
    },
    addNewOrder() {
      //結帳頁面
      //open loading
      this.loadingBtn = true;
      //console.log('-add-new-order-', this.form);
      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const form = this.form;
      this.$http.post(url, { data: form }).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCartData();
          this.form.message = "";
        } else {
          alert(res.data.message);
        }
        //close loading
        this.loadingBtn = false;
      });
    },
    /////////////////////////////
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          this.loadingStatus.loadingItem = "";
          this.$refs.userProductModal.hideModal();
          this.isLoading = false;
        } else {
          alert(response.data.message);
        }
      });
    },
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.products = response.data.products;
          this.isLoading = false;
        } else {
          alert(response.data.message);
        }
      });
    },
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.loadingStatus.loadingItem = "";
          this.product = response.data.product;
          this.isLoading = false;
          this.$refs.userProductModal.openModal();
        } else {
          alert(response.data.message);
        }
      });
    },
  },
};
</script>
