<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="@/assets/profile.png" class="user-img" />
            <h4>{{username}}</h4>
            <p>Hello, This is {{username}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="[isFavorite ? '' : 'active']"
                  @click="showArticles()"
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="[isFavorite ? 'active' : '']"
                  @click="showFavorited()"
                >Favorited Articles</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="articlesList" class="container">
        <div v-for="article of articlesList" :key="article.slug">
          <ArticlePreview :article="article" />
        </div>
        <div v-if="rows" class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            @change="getArticles"
          ></b-pagination>
        </div>
        <h3 v-else>Nothing to Show...</h3>
      </div>
    </div>
  </div>
</template>

<script lang= "ts">
import { Component, Vue } from "vue-property-decorator";
import UserModule from "@/store/Modules/users";
import ArticlesModule from "@/store/Modules/articles";
import ArticlePreview from "@/components/ArticlePreview.vue";

@Component({
  components: {
    ArticlePreview
  }
})
export default class Timeline extends Vue {
  key: string = "author";
  perPage = 9;
  currentPage = 1;

  get username() {
    return UserModule.username;
  }

  isFavorite: boolean = false;

  //show favorited articles
  showFavorited() {
    this.isFavorite = true;
    this.key = "favorited";
    this.getArticles(1);
  }

  //show user articles
  showArticles() {
    this.isFavorite = false;
    this.key = "author";
    this.getArticles(1);
  }

  //Get the total number of rows for paginantion
  get rows() {
    if (ArticlesModule && ArticlesModule.articles) {
      return ArticlesModule.articles.articlesCount;
    }
    return 0;
  }

  //Get the total articles
  get articlesList() {
    if (ArticlesModule && ArticlesModule.articles) {
      return ArticlesModule.articles.articles;
    }
    return [];
  }

  //fetch articles on page load
  mounted() {
    ArticlesModule.resetArticles();
    this.getArticles(this.currentPage);
  }

  //Get the article with query params
  getArticles(page: any) {
    if (this.username) {
      let params: any = {
        limit: this.perPage,
        offset: +this.perPage * +(+page - 1)
      };
      params[this.key] = this.username;
      ArticlesModule.getAllArticles(params);
    }
  }

  //Reset articles store when navigating from page
  beforeRouteLeave(to: any, from: any, next: any) {
    ArticlesModule.resetArticles();
    next();
  }
}
</script>

<style scoped>
.profile-page .user-info {
  text-align: center;
  background: #f3f3f3;
  padding: 2rem 0 1rem;
}
.profile-page .user-info .user-img {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 1rem;
}
img {
  vertical-align: middle;
}
.profile-page .user-info h4 {
  font-weight: 700;
}
.profile-page .user-info p {
  margin: 0 auto 0.5rem;
  color: #aaa;
  max-width: 450px;
  font-weight: 300;
}
.nav-pills.outline-active .nav-link.active {
  background: #fff !important;
  border-bottom: 2px solid #17a2b8 !important;
  color: #17a2b8 !important;
}

.nav-pills.outline-active .nav-link {
  background: #fff !important;
  color: black !important;
}
</style>>