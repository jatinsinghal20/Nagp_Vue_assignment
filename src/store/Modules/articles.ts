import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators";
import store from "@/store";
import Articles from '@/Common/Models/Articles';
import ArticlesService from "@/Services/articles.service"
import Article from '@/Common/Models/Article';

@Module({
    namespaced: true, 
    name: "articlesModule",
    dynamic : true,
    store
})
class ArticlesModule extends VuexModule{
    articles : Articles | null = null;
    articleToRead : Article | null = null;
    get getArticleList (){
        return this.articles ? this.articles.articles : null
    }

    @MutationAction({mutate: ['articles']})
    async getAllArticles(params: any) {
        const articles = await ArticlesService.getAllArticles(params);
        return { articles }
    }

    @MutationAction({mutate: ['articleToRead']})
    async getArticleBySlug(slug: string){
        const articleToRead = await ArticlesService.getArticleBySlug(slug);
        return{articleToRead}
    }

    @MutationAction({mutate: ['articleToRead']})
    async getCommentsOfArticle(slug: string){
        const articleToRead = await ArticlesService.getArticleBySlug(slug);
        return{articleToRead}
    }
}

export default getModule(ArticlesModule);