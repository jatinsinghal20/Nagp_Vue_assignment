<template>
  <div class="container" style="margin-top:15%; margin-bottom:15%">
    <div class="row">
      <div class ="col-6 offset-3 text-center">
        <h2 style="color:green">Sign In</h2>
        <router-link to="/register">Need An Account</router-link>
      </div>
    </div>
    <div class="row">
        <div class="col-12">
    <b-form @submit.stop.prevent>
      <label for="email">Email</label>
      <b-input  v-model="email" :state="false" id="email"></b-input>
      <b-form-invalid-feedback :state="false">Your email is incorrect.</b-form-invalid-feedback>

      <label for="text-password">Password</label>
      <b-input v-model="password" type="password" id="text-password" aria-describedby="password-help-block"></b-input>
      <b-form-text id="password-help-block">
        Your password must be 8-20 characters long, contain letters and numbers, and must not
        contain spaces, special characters, or emoji.
      </b-form-text>
    </b-form>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-6 offset-3 text-center">
            <button @click="login" type="button" class="btn btn-success">Login</button>
        </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import users from "@/store/Modules/users";

@Component
export default class Login extends Vue{
    email = '';
    password = '';

    login() {
        users.login({email:this.email, password: this.password})
    }
};
</script>

<style>
</style>