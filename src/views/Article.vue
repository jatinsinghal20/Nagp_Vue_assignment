<template>
  <div v-if="article" class="container mt-5">
    <br />
    <br />
    <div class="media show-article">
      <div class="ml-3 mr-5 mb-3 mt-3" style="max-width:100px; word-wrap: break-word;">
        <img src="@/assets/profile.png" class="profile" />
        <br />
        <span>{{article.author.username}}</span>
        <div 
          v-if="isLoggedIn">
        <button v-if="article.favorited"
          @click="toggleFavorited"
          class="btn btn-danger">
          <i class="fa fa-heart" aria-hidden="true"></i>UnFavorite
        </button>
        <button v-else
          @click="toggleFavorited"
          class="btn btn-light">
          <i class="fa fa-heart" aria-hidden="true"></i>Favorite
        </button>
        </div>
      </div>
      <div class="media-body mt-3 mb-3">
        <div v-if="isOwnArticle" style="float:right">
          <router-link :to="{ name: 'article-edit', params:{slug :`${article.slug}`} }">
            <button type="button" class="btn btn-outline-primary">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </router-link>
          <button type="button" @click="deleteArticle" class="btn btn-outline-danger ml-2">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <h4 class="mt-0">{{article.title}}</h4>
        <h6 class="mt-0">
          <em>{{article.description}}</em>
        </h6>
        <h6>
          <em class="text-muted">Published on - {{article.createdAt | date}}</em>
        </h6>
        <hr />
        <p>{{article.body}}</p>
      </div>
    </div>
    <br />
    <hr />
    <h3>Comments</h3>
    <hr />
    <div class="container">
      <div v-if="isLoggedIn" class="well">
        <div class="row">
          <div class="col-8">
            <div class="input-group input-group-lg">
              <input
                type="text"
                class="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                v-model="newComment"
              />
            </div>
          </div>
          <div class="col-4">
            <button class="btn btn-primary" @click="addNewComment()">Add Comment</button>
          </div>
        </div>
      </div>
      <div v-else>
        <h6>
          Please
          <router-link to="/login">
            <em style="color: red;">Sign In </em>
          </router-link>or
          <router-link to="/register">
            <em style="color: red;">Sign Up </em>
          </router-link>to add Comments.
        </h6>
      </div>
      <div v-for="comment of articleComments" :key="comment.id">
        <ArticleComment :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticlesModule from "@/store/Modules/articles";
import UsersModule from "@/store/Modules/users";
import ArticleComment from "@/components/ArticlesComment.vue";

@Component({
  components: {
    ArticleComment
  }
})
export default class Article extends Vue {
  newComment: string = "";

  //Get the article data
  get article() {
    return ArticlesModule.articleToRead;
  }

  //Get comments corresponding to article
  get articleComments() {
    return ArticlesModule.articleComments;
  }

  //check is user is owner of article
  get isOwnArticle() {
    if (this.article && UsersModule.username) {
      return this.article.author.username === UsersModule.username;
    } else {
      return false;
    }
  }

  //checks user is logged in or not
  get isLoggedIn() {
    return UsersModule.isLoggedIn;
  }

  //delete a particular article
  deleteArticle() {
    if (this.article) {
      ArticlesModule.deleteArticle(this.article.slug).then(() =>
        this.$router.push({ name: "home" })
      );
    }
  }

  //Add comments to article
  addNewComment() {
    if (this.article) {
      ArticlesModule.addComment(this.newComment).then(
        () => (this.newComment = "")
      );
    }
  }

  //change user favorite option for article
  toggleFavorited() {
    if (this.article) {
      if (this.article.favorited) {
        ArticlesModule.removeFavorited(this.article.slug);
      } else {
        ArticlesModule.addFavorited(this.article.slug);
      }
    }
  }

  //fetch the article details
  beforeRouteEnter(to: any, from: any, next: any) {
    Promise.all([
      ArticlesModule.getArticleBySlug(to.params.slug),
      ArticlesModule.getCommentsOfArticle(to.params.slug)
    ]).then(() => {
      next();
    });
  }
}
</script>

<style scoped>
.show-article {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.profile {
  max-width: 100%;
  max-height: 100px;
}
</style>