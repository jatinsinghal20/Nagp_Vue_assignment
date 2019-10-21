<template>
  <div class="home">
    <div class="row">
      <div class="col-md-9">
        <div class="container">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="[isTagged ? '' : 'active']"
                  @click="showArticles()"
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" v-if="isTagged">#{{selectedTag}}</a>
              </li>
            </ul>
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
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <div v-for="(tag, index) in tags" :key="index">
              <a @click="fetchTag" class="tag-pill tag-default" style="float:right" v-text="tag"></a>
            </div>
          </div>
        </div>
      </div>
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
  isTagged: boolean = false;
  selectedTag: string | null = null;

  //Get the total number of rows for paginantion
  get rows() {
    if (ArticlesModule && ArticlesModule.articles) {
      return ArticlesModule.articles.articlesCount;
    }
    return 0;
  }

  //Get the popular tags list
  get tags() {
    if (ArticlesModule && ArticlesModule.tags) {
      return ArticlesModule.tags;
    }
    return [];
  }

  //Get the total articles
  get articlesList() {
    if (ArticlesModule && ArticlesModule.articles) {
      return ArticlesModule.articles.articles;
    }
    return [];
  }

  //fetch articles and tags on page load
  mounted() {
    this.getArticles(this.currentPage);
    this.getTags();
  }

  //Get the article with query params
  getArticles(page: any) {
    let params: any = {
      limit: this.perPage,
      offset: +this.perPage * +(+page - 1)
    };
    if (this.isTagged) {
      params["tag"] = this.selectedTag;
    }
    ArticlesModule.getAllArticles(params);
  }

  //fetch list of popular tags
  getTags() {
    ArticlesModule.getTags();
  }

  //show list of articles
  showArticles() {
    this.isTagged = false;
    ArticlesModule.resetArticles();
    this.getArticles(1);
  }

  //fetch the articles related to particular tag
  fetchTag(event: any) {
    if (event && event.target) {
      ArticlesModule.resetArticles();
      this.selectedTag = event.target.innerText.trim();
      this.isTagged = true;
      this.getArticles(1);
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
.tag-default {
  color: #fff !important;
  font-size: 0.8rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  white-space: nowrap;
  margin-right: 3px;
  margin-bottom: 0.2rem;
  display: inline-block;
  background-color: #818a91;
}
.tag-pill {
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
}
a {
  cursor: pointer;
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
</style>