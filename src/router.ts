import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { Component } from 'vue-property-decorator'

Vue.use(Router);
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave'
]);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
    }, 
    
    {
      name: "article",
      path: "/articles/:slug",
      component: () => import("@/views/Article.vue"),
      props: true
    },
    {
      name: "article-edit",
      path: "/editor/:slug?",
      props: true,
      component: () => import("@/views/ArticleEdit.vue")
    }
  ],
});
