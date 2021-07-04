import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
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
      }
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
    getProductList() {

      //目前第幾頁
      const current_page = this.page;

      //get Url
      const url = `${this.api}/api/${this.path}/admin/products?page=${current_page}`;

      //打Api取資料
      axios.get(url).then((res) => {
        //console.log("===res===", res);

        if (res.data.success) {
          //商品資料
          this.productData = res.data.products;

          //console.log("===data===", this.productData);
        } else {
          //取資料失敗
          this.productData = [];
        }
      });
    },
    //開啟新增/編輯 商品頁
    openProduct(value, data = ''){
       //新增/編輯 動作
      if(value == 'add'){ 
        //新增
        this.getProDuctData = {};
        this.getProDuctData.action = value;

        productModal.show();
      
      }else if (value == "edit"){
        //編輯
        productModal.show();
        
        //取得資料
        this.getProDuctData = data;

        this.getProDuctData.action = value;
      }else if(value== 'del'){

        delProductModal.show();
        
        //取得資料
        this.getProDuctData = data;

      }
  },
  //新增照片
    createImages() {
       
      this.getProDuctData.imagesUrl = [];
      this.getProDuctData.imagesUrl.push('');
    },
    //更新商品
    productClick(){
      if(this.getProDuctData.id){
        //編輯商品
         this.editProduct(); 
      }else{
        //新增商品
         this.addProduct();
      }
    },
    //更新新增商品
    addProduct(){
      const dataObject ={ 
            data: this.getProDuctData
      }

      //get Url
      const url = `${this.api}/api/${this.path}/admin/product`;

      // 打  Api
      axios.post(url, dataObject).then((res) => {
        //console.log("===res===", res);

        if (res.data.success) {
          alert(res.data.message);
          productModal.hide();
          this.getProductList();
          
        } else {
          //儲存失敗
          alert(res.data.message);
        }
        
      });
       
    },
    //更新編輯商品
    editProduct(){
      //商品資料
      const dataObject ={ 
          data: this.getProDuctData
      }

      //get Url 
      const url=`${this.api}/api/${this.path}/admin/product/${this.getProDuctData.id}`;
      
      //打 Api
      axios.put(url, dataObject).then((res) => {
        //console.log("===put-res===", res);

        if (res.data.success) {
          alert(res.data.message);
          productModal.hide();
          this.getProductList();
          
        } else {
          //儲存失敗
          alert(res.data.message);
        }
      });

    },
    delProdect(){
      //console.log('delll', this.getProDuctData);

       //get Url 
      const url=`${this.api}/api/${this.path}/admin/product/${this.getProDuctData.id}`;

      //console.log('delllurl', url);
      
      //打 Api
      axios.delete(url).then((res) => {
        //console.log("===put-res===", res);

        if (res.data.success) {
          alert(res.data.message);
          delProductModal.hide();
          this.getProductList();
          
        } else {
          //儲存失敗
          alert(res.data.message);
        }
       
      });

    },
}
}).mount('#app');
