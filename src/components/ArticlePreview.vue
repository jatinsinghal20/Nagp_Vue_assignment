<template>
  <div class="article-preview">
    <div class="article-meta">
      <img src="@/assets/profile.png" />
      <div class="info">
        <a class="author">{{article.author.username}}</a>
        <span class="date">{{article.createdAt |date}}</span>
      </div>
      <button
        v-if="isLoggedIn"
        class="btn btn-sm"
        style="float:right"
        @click="toggleFavorite"
        :class="[article.favorited ? 'btn-danger' : 'btn-outline-danger']"
      >
        <i class="fa fa-heart" aria-hidden="true"></i>
        <span class="ml-1">{{article.favoritesCount}}</span>
      </button>
    </div>
    <router-link :to="`/articles/${article.slug}`" class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Article from "../Common/Models/Article";
import UsersModule from "@/store/Modules/users";
import ArticlesModule from "@/store/Modules/articles";

@Component
export default class ArticlePreview extends Vue {
  @Prop() private article!: Article;
  get isLoggedIn() {
    return UsersModule.isLoggedIn;
  }

  //Mark article as favourite/unfavourite
  toggleFavorite() {
    if (this.article) {
      if (this.article.favorited) {
        ArticlesModule.removeFavorited(this.article.slug).then(() => {
          this.article.favorited = false;
          this.article.favoritesCount--;
        });
      } else {
        ArticlesModule.addFavorited(this.article.slug).then(() => {
          this.article.favorited = true;
          this.article.favoritesCount++;
        });
      }
    }
  }
}
</script>

<style scoped>
.article-title {
  max-height: 75px;
  text-overflow: ellipsis;
}
.favourite {
  color: red;
}
.unFavourite {
  color: white;
}

.article-preview {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
}
.article-preview .article-meta {
  margin: 0 0 1rem;
}
.article-meta {
  display: block;
  position: relative;
  font-weight: 300;
}
.article-meta img {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
  width: 32px;
  border-radius: 30px;
}
.article-meta .info {
  margin: 0 1.5rem 0 0.3rem;
  display: inline-block;
  vertical-align: middle;
  line-height: 1rem;
}
.article-meta .info .author {
  display: block;
  font-weight: 500 !important;
}
.article-meta .info .date {
  color: #bbb;
  font-size: 0.8rem;
  display: block;
  box-shadow: 0 0 black;
}
.article-preview .preview-link h1 {
  font-weight: 600 !important;
  font-size: 1.5rem !important;
  margin-bottom: 3px;
  color: black;
}
.article-preview .preview-link p {
  font-weight: 300;
  font-size: 24px;
  color: #999;
  margin-bottom: 15px;
  font-size: 1rem;
  line-height: 1.3rem;
}

.article-preview .preview-link span {
  max-width: 30%;
  font-size: 0.8rem;
  font-weight: 300;
  color: #bbb;
  vertical-align: middle;
}
</style>

