import userProductModal from '../component/userProductModal.js';
import pagination from '../component/Pagination.js'; //分頁

//驗證
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


Vue.createApp({
  components:{
    userProductModal: userProductModal,
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  data() {
    return {
      api : "https://vue3-course-api.hexschool.io",
      path : "get-mydata",
      page: 1,
      getProDuctList:{
        title: '',
        imageUrl: '',
        imagesUrl:[],
        category:'',
        price: 0,
        origin_price: 0,
        unit: '',
        description:'',
        content:'',
        is_enabled: 0,
        action: '',
      },
      product: {},
      paginations: {},
       getCartList: {},
       form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      loadingDetailProductId: '',
      loadingAddProductId: '',
      loadingDelProductId: '',
      loadingDelAll :false,
      loadingBtn :false,
    };
  },
  created() {
    this.getProductList();
    this.getCartData();
  },
  methods: {
    //取得商品列表
    getProductList(value) {

      //目前第幾頁
      const current_page = value ? value :this.page;

      //get Url
      const url = `${this.api}/api/${this.path}/products?page=${current_page}`;

      //打Api取資料
      axios.get(url).then((res) => {
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
    openProductDetail(id){
      //商品詳情
      //console.log("===id===", id);

      //open loading
      this.loadingDetailProductId = id;

      //get Url
      const url = `${this.api}/api/${this.path}/product/${id}`;

      //打Api取資料
      axios.get(url).then((res) => {
        //console.log("===res-id===", res);

        if (res.data.success) {

          //此商品詳情資料
          this.product = res.data.product;

          this.$refs.userProductModal.openModal();

        } else {
          alert(res.data.message);
        }

        //close loading
        this.loadingDetailProductId = '';
      });
    },
    addCart(id, qty = 1) {
      //加入購物車

      //get Url
      const url = `${this.api}/api/${this.path}/cart`;
      
      //open loading
      this.loadingAddProductId = id;

      const data = {
        product_id: id,
        qty: qty,
      };

      //打Api取資料
      axios.post(url, { data: data }).then((res) => {
        console.log("===res-add-cart===", res);

        if (res.data.success) {

          alert(res.data.message);

          //關閉商品詳情頁
          this.$refs.userProductModal.hideModal();
          
          this.getCartData();
        } else {
          
          alert(res.data.message);
        }

        //close loading
        this.loadingAddProductId = '';
      });

      
    },
    getCartData() {
      //取得購物車列表
      
      //get Url
      const url = `${this.api}/api/${this.path}/cart`;

      //打Api取資料
      axios.get(url).then((res) => {

        //console.log("===res-get-cart===", res);

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
      const url = `${this.api}/api/${this.path}/cart/${value.id}`;

      //資料
      const data = {
        product_id: value.product_id,
        qty: value.qty,
      };

      //打Api取資料
      axios.put(url, { data: data }).then((res) => {
        console.log('-res-update-cart-', res);

        if(res.data.success) {
          alert(res.data.message);
          this.getCartData();
        } else {
          alert(res.data.message);
        }
      });
    },
    delCartProdect(item){
      //console.log('-del-item-', item);

      //get Url
      const url = `${this.api}/api/${this.path}/cart/${item.id}`;

      //open loading
      this.loadingDelProductId = item.id;

      axios.delete(url).then((res) => {
          console.log('-res-del-cart-', res);

        if (res.data.success) {
          alert(res.data.message);
          
          this.getCartData();
        } else {
          alert(res.data.message);
        }

        //close loading
        this.loadingDelProductId = '';
      });
    },
    delAllCart(){
      //刪除全部購物車
      
      //open loading
      this.loadingDelAll = true;

      //get Url
      const url = `${this.api}/api/${this.path}/carts`;

      axios.delete(url).then((res) => {
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
      const url = `${this.api}/api/${this.path}/order`;

      const form = this.form;
      
      axios.post(url, { data: form }).then((res) => {
        if (res.data.success) {

          alert(res.data.message);

          this.$refs.form.resetForm();

          this.getCartData();
        
          this.form.message ="";

        } else {

          alert(res.data.message)
        }

        //close loading
        this.loadingBtn = false;
      });
    },
  },
}).mount('#app');
