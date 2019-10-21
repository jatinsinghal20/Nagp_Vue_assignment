import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import Articles from '@/Common/Models/Articles';
import ArticlesService from "@/Services/articles.service"
import Article from '@/Common/Models/Article';

@Module({
    namespaced: true,
    name: "articlesModule",
    dynamic: true,
    store
})
class ArticlesModule extends VuexModule {
    articles: Articles | null = null;
    articleToRead: Article | null = null;
    articleComments: Comment[] | null = null;
    tags: string[] | null = null;

    get getArticleList() {
        return this.articles ? this.articles.articles : null
    }
    
    //get all articles list
    @MutationAction({ mutate: ['articles'] })
    async getAllArticles(params: any) {
        const articles = await ArticlesService.getAllArticles(params);
        return { articles }
    }

    @MutationAction({ mutate: ['tags'] })
    async getTags() {
        const tags = await ArticlesService.getTags();
        return { tags }
    }

    //get particula Article
    @MutationAction({ mutate: ['articleToRead'] })
    async getArticleBySlug(slug: string) {
        const articleToRead = await ArticlesService.getArticleBySlug(slug);
        return { articleToRead }
    }

    //get Comments Of Article
    @MutationAction({ mutate: ['articleComments'] })
    async getCommentsOfArticle(slug: string) {
        const response = await ArticlesService.getCommentsOfArticle(slug);
        let articleComments = null;
        if (response) {
            articleComments = response.comments;
        }
        return { articleComments }
    }

    //add an article
    @Action
    async addNewArticle(article: any) {
        return await ArticlesService.addNewArticle(article);
    }

    //edit an article
    @Action
    async editArticle(article: Article) {
        return await ArticlesService.editArticle(article);
    }


    //delete an article
    @Action
    async deleteArticle(slug: string) {
        return ArticlesService.deleteArticle(slug);
    }

    // addd new comment to article
    @Action
    async addComment(comment: string) {
        if (this.articleToRead) {
            return ArticlesService.addComment(comment, this.articleToRead.slug).then((data) => {
                if (this.articleComments && data) {
                    this.articleComments.unshift(data)
                }
            });
        }
    }

    //remove article as favorite
    @Action
    async removeFavorited(slug: string) {
        return ArticlesService.removeFavorited(slug).then((data) => {
            if (this.articleToRead && data && this.articleToRead.slug === data.slug) {
                this.articleToRead.favorited = false;
            }
        });
    };

    //add article as favorite
    @Action
    async addFavorited(slug: string) {
        return ArticlesService.addFavorited(slug).then((data) => {
            if (this.articleToRead && data && this.articleToRead.slug === data.slug) {
                this.articleToRead.favorited = true;
            }
        });
    };

    //delete particular comment
    @Action
    async deleteComment(id: number) {
        if (this.articleToRead) {
            return ArticlesService.deleteComment(id.toString(), this.articleToRead.slug).then(() => {
                if (this.articleToRead) {
                    this.getCommentsOfArticle(this.articleToRead.slug);
                }
            });
        }
    }

    //reset article
    @Mutation
    resetArticle() {
        this.articleToRead = null;
        this.articleComments = null;
    }

    // Reset articles list
    @Mutation
    resetArticles() {
        this.articles = null;
    }
}

export default getModule(ArticlesModule);