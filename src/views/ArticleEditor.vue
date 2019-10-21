<template>
  <div class="container mt-5">
    <form>
      <div class="form-group mt-3">
        <input
          type="text"
          class="form-control form-control-lg"
          id="title"
          placeholder="Enter Title"
          v-model="articleToEdit.title"
        />
      </div>
      <div class="form-group mt-3">
        <input
          type="text"
          class="form-control form-control-lg"
          id="description"
          placeholder="Enter Description"
          v-model="articleToEdit.description"
        />
      </div>

      <div class="form-group mt-3">
        <textarea
          class="form-control form-control-lg"
          id="exampleFormControlTextarea1"
          rows="5"
          placeholder="Share something with WORLD!!!!"
          v-model="articleToEdit.body"
        ></textarea>
      </div>

      <div class="form-group mt-3">
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="tags"
          id="tags"
          placeholder="Enter Tags"
        />
      </div>
    </form>
    <button class="btn btn-primary" @click="postArticle">Share My Article</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UsersModule from "@/store/Modules/users";
import ArticlesModule from "@/store/Modules/articles";
import Article from "../Common/Models/Article";

@Component
export default class ArticleEditor extends Vue {
  article: any;
  tags: string = "";
  isEdit: boolean = false;

  //Get the article which need to be edited/added
  get articleToEdit() {
    if (ArticlesModule.articleToRead) {
      this.isEdit = true;
      if (ArticlesModule.articleToRead.tagList) {
        this.tags = ArticlesModule.articleToRead.tagList.join(" ");
      }
      this.article = ArticlesModule.articleToRead;
    }
    return this.article;
  }

  //create new article before page loads
  beforeMount() {
    this.article = {
      title: "",
      slug: "",
      description: "",
      body: ""
    };
  }

  //save the updated/new article
  async postArticle() {
    let articleSaved = null;
    this.articleToEdit.tagList = this.tags.split(" ");
    //if edit mode call put api
    if (this.isEdit) {
      articleSaved = await ArticlesModule.editArticle(this.articleToEdit);
    } else {
      articleSaved = await ArticlesModule.addNewArticle(this.articleToEdit);
    }
    if (articleSaved) {
      this.$router.push({
        name: "article",
        params: { slug: articleSaved.slug }
      });
    }
  }

  // get the article to edit before the route enter to the page
  beforeRouteEnter(to: any, from: any, next: any) {
    ArticlesModule.resetArticle();
    if (to.params.slug) {
      Promise.all([ArticlesModule.getArticleBySlug(to.params.slug)]).then(
        () => {
          next();
        }
      );
    } else {
      next();
    }
  }

  //clear article when route leaves
  beforeRouteLeave(to: any, from: any, next: any) {
    ArticlesModule.resetArticle();
    next();
  }
}
</script>

<style>
</style>