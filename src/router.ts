import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { Component } from 'vue-property-decorator'
import authGuard from '@/Common/Guard/auth.guard'

Vue.use(Router);
Component.registerHooks([
  'beforeRouteEnter',
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
      path: '/articles',
      name: 'articles',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    }, 
    
    {
      path: '/timeline',
      name: 'timeline',
      beforeEnter: authGuard.authGuard, 
      component: () => import('@/views/Timeline.vue'),
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
      beforeEnter: authGuard.authGuard, 
      props: true,
      component: () => import("@/views/ArticleEditor.vue")
    }
  ],
});
