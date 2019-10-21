<template>
  <div class="container" style="margin-top:15%; margin-bottom:15%">
    <div class="row">
      <div class="col-6 offset-3 text-center">
        <h2 style="color:green">Welcome to Blogging</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-form @submit.stop.prevent>
          <label for="email">Username</label>
          <b-input
            :class="[usernameValidation.length > 0?'borderError':'']"
            v-model="username"
            id="username"
          ></b-input>
          <div v-if="usernameValidation.length > 0">
            <div
              style="color:red;"
              v-for="(errors, index) of usernameValidation"
              :key="index"
            >Email {{errors}}</div>
          </div>
          <label for="email">Email</label>
          <b-input
            v-model="email"
            :class="[emailValidation.length > 0?'borderError':'']"
            id="email"
          ></b-input>
          <div v-if="emailValidation.length > 0">
            <div
              style="color:red;"
              v-for="(errors, index) of emailValidation"
              :key="index"
            >Email {{errors}}</div>
          </div>
          <label for="text-password">Password</label>
          <b-input
            :class="[passwordValidation.length > 0?'borderError':'']"
            v-model="password"
            type="password"
            id="text-password"
            aria-describedby="password-help-block"
          ></b-input>
          <div v-if="passwordValidation.length > 0">
            <div
              style="color:red;"
              v-for="(errors, index) of passwordValidation"
              :key="index"
            >Email {{errors}}</div>
          </div>
          <b-form-text id="password-help-block">
            Your password must be 8 characters long, contain letters and numbers
          </b-form-text>
        </b-form>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-6 offset-3 text-center">
        <button @click="register" type="button" class="btn btn-success">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import users from "@/store/Modules/users";

@Component
export default class register extends Vue {
  email = "";
  password = "";
  username = "";
  emailValidation = [];
  passwordValidation = [];
  usernameValidation = [];
  //Register new user.
  register() {
    users
      .register({
        email: this.email,
        password: this.password,
        username: this.username
      })
      .then(() => this.$router.push({ name: "home" }))
      .catch(err => {
        if (users.errors) {
          this.emailValidation = users.errors.email;
          this.passwordValidation = users.errors.password;
          this.usernameValidation = users.errors.username;
        }
      });
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    users.resetErrors();
    next();
  }
}
</script>

<style scoped>
.borderError {
  border-color: red;
}
</style>