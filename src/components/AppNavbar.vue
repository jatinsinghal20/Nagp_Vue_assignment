<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/">
        <b-navbar-brand>Blogging</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="isLoggedIn" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              Hello, <em> {{username}}</em>
            </template>
            
          <router-link to="/SignIn">
            <b-dropdown-item>Profile</b-dropdown-item>
          </router-link>
          
          <router-link to="/SignIn">
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </router-link>

          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">         
            <b-nav-item><router-link to="/login" class="nav-link">Sign In</router-link></b-nav-item>         
            <b-nav-item><router-link to="/register" class="nav-link">Sign Up</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {Component, Vue } from 'vue-property-decorator';
import users from "@/store/Modules/users";

@Component
export default class AppNavbar extends Vue{
    isLoggedIn = false;
    
    get username () {
        if(users.username){
            this.isLoggedIn = true;
        }
        return users.username
    }
};
</script>
