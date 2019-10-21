import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue';
import './plugins/bootstrap-vue'
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import DateFilter from '@/Common/Filters/date.filter';


Vue.config.productionTip = false;


Vue.filter("date", DateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
