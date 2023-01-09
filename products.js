import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'esther-hexschool',
      products: [],  //承載API所有商品資料
      detailProduct: {}, // 指定單一商品詳細資料
    }
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          //登入成功時，取的商品資料
          this.getData();
        })
        .catch((err) => {
          alert('登入失敗')
          //頁面跳轉至login.html
          window.location = 'login.html';
        })
    },
    //取得商品資料
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((response) => {
          //response.data.products 為API商品資料
          this.products = response.data.products;
        })
        .catch((err) => {
          alert('資料獲取失敗');
        })
    },
    //展開商品的詳細資料
    openProduct(item) {
      this.detailProduct = item; 
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    //把取出的token放入headers裡一起發送請求
	  axios.defaults.headers.common["Authorization"] = token;
    // 確認是否登入
    this.checkAdmin()
  }
}).mount('#app');