<template>
  <div id="app">
    <AppNavbar></AppNavbar> 
    <div class="container">
      <router-view />
    </div>
    <!-- <AppFooter></AppFooter> -->
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import AppFooter from "@/components/AppFooter.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import users from './store/Modules/users';

@Component({
  components : {
    AppFooter,
    AppNavbar,
  }
})
export default class App extends Vue {

  //check if user is logged in or not on page reload.
  beforeCreate() { Promise.all([users.checkAuth()]);}
 
}
</script>