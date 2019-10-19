<template>
    <div v-if="article" class="container">
        {{article.slug}}
    </div>    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticlePreview from "@/components/ArticlePreview.vue"; // @ is an alias to /src
import ArticlesModule from "@/store/Modules/articles";

@Component({
  components: {
    ArticlePreview,
  }
})
export default class Article extends Vue {
    get article(){
        return ArticlesModule.articleToRead;
    }
  beforeRouteEnter(to: any, from: any, next :any) {
      console.log(to);
    Promise.all([
      ArticlesModule.getArticleBySlug(to.params.slug)
    ]).then(() => {
      next();
    });
  };
}
</script>
