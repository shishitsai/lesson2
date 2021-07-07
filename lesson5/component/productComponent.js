export default {
  
  template: `<div
        id="productModal"
        ref="productModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>

                <span v-else>修改產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="imageUrl">主要圖片</label>
                    <input
                      v-model="productData.imageUrl"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                    <img class="img-fluid" :src="productData.imageUrl" />
                  </div>
                  <div class="mb-1">多圖新增</div>
                  <div v-if="Array.isArray(productData.imagesUrl)">
                    <div
                      class="mb-1"
                      v-for="(image, key) in productData.imagesUrl"
                      :key="key"
                    >
                      <div class="form-group">
                        <label for="imageUrl">圖片網址</label>
                        <input
                          v-model="productData.imagesUrl[key]"
                          type="text"
                          class="form-control"
                          placeholder="請輸入圖片連結"
                        />
                      </div>
                      <img class="img-fluid" :src="image" />
                    </div>
                    <div
                      v-if="!productData.imagesUrl.length || productData.imagesUrl[productData.imagesUrl.length - 1]"
                    >
                      <button
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="productData.imagesUrl.push('')"
                      >
                        新增圖片
                      </button>
                    </div>
                    <div v-else>
                      <button
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="productData.imagesUrl.pop()"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="createImages"
                    >
                      新增圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                      v-model="productData.title"
                    />
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        id="category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        v-model="productData.category"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        id="unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        v-model="productData.unit"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model.number="productData.origin_price"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                        v-model.number="productData.price"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="productData.description"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="productData.content"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="productData.is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="productClick"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>`,
    props: {
      productData: {
        type: Object,
        default() {
          return { 
          }
        }
      },
      isNew:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        modal: null,
        api : "https://vue3-course-api.hexschool.io",
        path : "get-mydata",
      };
    },
    methods: {
      //新增照片
    createImages() {
      this.productData.imagesUrl = [];
      this.productData.imagesUrl.push('');
    },
    //更新商品
    productClick(){

      if(this.productData.id){
        //編輯商品
        this.editProduct(); 
      }else{
        //新增商品
        this.addProduct();
      }
    },
    //新增商品
    addProduct(){
      const dataObject ={ 
            data: this.productData
      }

      //get Url
      const url = `${this.api}/api/${this.path}/admin/product`;

      // 打  Api
      axios.post(url, dataObject).then((res) => {
        //console.log("===res===", res);

        if (res.data.success) {
          alert(res.data.message);
          this.$emit('isUpdateData', true);
          
        } else {
          //儲存失敗
          alert(res.data.message);
          this.$emit('isUpdateData', false);
        }
        
      });
    },
    //更新商品
    editProduct(){
      //商品資料
      const dataObject ={ 
          data: this.productData
      }

      //get Url 
      const url=`${this.api}/api/${this.path}/admin/product/${this.productData.id}`;
      
      //打 Api
      axios.put(url, dataObject).then((res) => {
        console.log("===put-res===", res);

        if (res.data.success) {
          alert(res.data.message);
          this.$emit('isUpdateData', true);
          
        } else {
          //儲存失敗
          alert(res.data.message);
          this.$emit('isUpdateData', false);
        }
      });

    },
    },

}