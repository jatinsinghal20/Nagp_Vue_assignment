<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/">
        <b-navbar-brand>Blogging</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="username" class="ml-auto">
          <b-nav-item>
            <router-link to="/" class="nav-link">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              active-class="active"
              :to="{ name: 'article-edit' }"
              class="nav-link"
            >New Article</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              active-class="active"
              :to="{ name: 'timeline' }"
              class="nav-link"
            >My Timeline</router-link>
          </b-nav-item>
          <b-nav-item active-class="active" @click="signout()" class="nav-link">Sign Out</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item>
            <router-link to="/login" class="nav-link">Sign In</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/register" class="nav-link">Sign Up</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import users from "@/store/Modules/users";

@Component
export default class AppNavbar extends Vue {
  //get username if logged in
  get username() {
    return users.username;
  }

  //logout user
  signout() {
    users.signout();
    this.$router.push({ name: "home" });
  }
}
</script>
