<template>
  <div style="height:370px">
    <div class="card" style="height:350px">
      <div class="card-header text-center">{{article.author.username}}</div>
      <div class="card-block text-center" style="height:250px">
        <div style="height:200px; overflow:hidden">
          <h5
            class="card-title article-title"
            style="max-height:75px; overflow:hidden"
          >{{article.title}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{article.description}}</h6>
        </div>
        <router-link :to="`/articles/${article.slug}`" class="text-muted">Read More</router-link>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Article from "../Common/Models/Article";

@Component
export default class ArticlePreview extends Vue {
  @Prop() private article!: Article;
}
</script>

<style scoped>
.article-title {
  max-height: 75px;
  text-overflow: ellipsis;
}
</style>
