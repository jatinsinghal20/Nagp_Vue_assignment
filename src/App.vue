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
import HelloWorld from "@/components/HelloWorld.vue";
import AppNavbar from "@/components/AppNavbar.vue";

@Component({
  components : {
    AppFooter,
    AppNavbar,
  }
})
export default class App extends Vue {}
</script>