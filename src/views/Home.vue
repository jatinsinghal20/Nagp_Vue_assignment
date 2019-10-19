<template>
  <div class="home">
    <div class="container"></div>
    <div v-if="articlesList" class="container">
      <div class="row">
        <div v-for="article of articlesList" :key="article.slug" class="col-md-6 col-lg-4">
          <ArticlePreview :article="article" />
        </div>
      </div>
      <div v-if="currentPage>0" class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          @change="getArticles"
        ></b-pagination>
      </div>
    </div>
    <div v-else class="container">
      <h1>loading...</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticlePreview from "@/components/ArticlePreview.vue"; // @ is an alias to /src
import ArticlesModule from "@/store/Modules/articles";

@Component({
  components: {
    ArticlePreview
  }
})
export default class Home extends Vue {
  perPage = 9;
  currentPage = 1;

  get rows() {
    if (ArticlesModule && ArticlesModule.articles) {
      return ArticlesModule.articles.articlesCount;
    }
    return 0;
  }

  get articlesList() {
    if (ArticlesModule && ArticlesModule.articles) {
      return ArticlesModule.articles.articles;
    }
    return [];
  }

  mounted() {
    this.getArticles(this.currentPage);
  }

  getArticles(page: any) {
    let params = {
      limit: this.perPage,
      offset: +this.perPage * +(+page - 1)
    };
    ArticlesModule.getAllArticles(params);
  }
}
</script>
