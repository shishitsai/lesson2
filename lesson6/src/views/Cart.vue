<template>
  <!-- 購物車列表 -->
  <div class="text-end">
    <h1 style="text-align: center">購物車專頁</h1>
    <button class="btn btn-outline-danger" type="button" @click="delAllCart()">
      <i class="fas fa-spinner fa-pulse" v-if="loadingDelAll"></i>
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="getCartList.carts">
        <tr v-for="(item, index) in getCartList.carts" :key="index">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="delCartProdect(item)"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="loadingDelProductId == item.id"
              ></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <div class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  min="1"
                  type="number"
                  class="form-control"
                  v-model.number="item.qty"
                  @blur="updateCartData(item)"
                />
                <span class="input-group-text" id="basic-addon2"
                  >{{ item.product.unit }}
                </span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ item.product.price }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ getCartList.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">
          {{ getCartList.final_total }}
        </td>
      </tr>
    </tfoot>
  </table>
  <!---------- 表單 ---------------->
  <div class="my-5 row justify-content-center">
    <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="addNewOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email!"
          rules="email|required"
          v-model="form.user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名!"
          rules="required"
          v-model="form.user.name"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話!"
          rules="required|min:8|max:10"
          v-model="form.user.tel"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址~"
          rules="required"
          v-model="form.user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">
          <i class="fas fa-spinner fa-pulse" v-if="loadingBtn"></i>
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
//import userProductModal from "@/components/UserProductModal.vue";
//import userProductModal from "@/components/UserProductModal.vue";

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
      ///////////////////

      getCartList: {},

      ///////////////////
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
    //userProductModal,
    // Form,
    // Field,
    // eslint-disable-next-line no-undef
    // ErrorMessage: ,
  },
  created() {
    //取得購物車列表
    this.getCartData();
    //this.getCartData();
  },
  methods: {
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
          //this.$refs.userProductModal.hideModal();
          this.getCartData();
        } else {
          alert(res.data.message);
        }
        //close loading
        this.loadingAddProductId = "";
      });
    },
    getCartData() {
      //取得購物車列表

      //get Url
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;

      //打Api取資料
      this.$http.get(url).then((res) => {
        console.log("===res-get-cart===", res);

        if (res.data.success) {
          this.getCartList = res.data.data;
        } else {
          alert(res.data.message);
        }
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
      this.$http.put(url, { data: data }).then((res) => {
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
          //this.$refs.userProductModal.hideModal();
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
          //this.$refs.userProductModal.openModal();
        } else {
          alert(response.data.message);
        }
      });
    },
  },
};
</script>
<style scoped>
.invalid-feedback,
.form-label {
  text-align: left;
}
</style>
