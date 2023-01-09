//引入vue3
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
createApp({
    data(){
        return {
            // 登入的帳戶密碼 透過 v-model 雙向綁定 取的用戶輸入內容
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods : {
        login() {
            const apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios
                .post(apiUrl,this.user)
                //登入成功的結果
                .then((res) => {
                    //取得回傳資料的 token expired
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    //頁面跳轉
                    window.location = 'products.html';
                })
                //登入失敗的結果
                .catch((error) => {
                    alert('登入失敗請重新輸入');
                })
        }
    }
}).mount('#app')

