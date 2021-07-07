import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from '../component/Pagination.js'; //分頁
import productComponent from '../component/productComponent.js'; //編輯商品視窗內容
import productDelComponent from '../component/productDelComponent.js'; //刪除商品視窗內容

 //編輯商品視窗
let productModal = null;
//刪除商品視窗
let delProductModal = null;

createApp({
  components:{
    pagination,
    productComponent,
    productDelComponent
  },
  data() {
    return {
      api : "https://vue3-course-api.hexschool.io",
      path : "get-mydata",
      productData :[],
      page: 1,
      getProDuctData:{
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
      paginations: {},
      isNew: false,
    };
  },
  mounted() {
    //get token
    const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
    );

    //存token 值
    axios.defaults.headers.common.Authorization = token;
    
    //新增/修改商品
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });

    //刪除商品
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
    
    //商品列表
    this.getProductList();
  },
  methods: {
  
    //取得商品列表
    getProductList(value) {

      //目前第幾頁
      const current_page = value ? value :this.page;

      //get Url
      const url = `${this.api}/api/${this.path}/admin/products?page=${current_page}`;

      //打Api取資料
      axios.get(url).then((res) => {
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
    //開啟 新增/編輯 商品頁
    openProduct(value, data = ''){

       //新增/編輯 動作
      if(value == 'add'){ 
        //新增
        this.getProDuctData = {};
        this.getProDuctData.action = value;
        this.isNew = true,
        
        //開啟商品編輯視窗
        productModal.show();
      
      }else if (value == "edit"){
        //編輯
         this.isNew = false,
        
        //取得資料
        this.getProDuctData = data;

        this.getProDuctData.action = value;

        //開啟商品編輯視窗
        productModal.show();

      }else if(value== 'del'){
 
        //取得資料
        this.getProDuctData = data;

         //開啟刪除視窗
        delProductModal.show();
      }
  },
  isUpdateData(value){
    //是否更新增料

    if(value){

      //關閉商品編輯視窗
      productModal.hide();

      //重整商品列表
      this.getProductList();
    }
  },
  delUpdateData(value){

    if(value){
      //關閉刪除視窗
      delProductModal.hide(); 

      //重整商品列表
      this.getProductList();
    }
  }
}
}).mount('#app');
