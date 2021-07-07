export default {
  template: `<div
        id="delProductModal"
        ref="delProductModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="delProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger"></strong>
              <span style="color: #dc3545">{{productData.title}}</span>
              商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="delProdect">
                確認刪除
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
      delProdect(){

        //get Url 
        const url=`${this.api}/api/${this.path}/admin/product/${this.productData.id}`;

        //打 Api
        axios.delete(url).then((res) => {
        
          if (res.data.success) {
            alert(res.data.message);
            this.$emit('delUpdateData', true);
            
          } else {
            
            //儲存失敗
            alert(res.data.message);
            this.$emit('delUpdateData', false);
          }
        
        });

    },
    },

}