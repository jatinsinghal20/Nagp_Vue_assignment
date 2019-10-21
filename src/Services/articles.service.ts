import { get, query,post, put, deleteApi } from "./api";
import Articles from '@/Common/Models/Articles';
import Article from '@/Common/Models/Article';
import CommentsResponse from '@/Common/Models/CommentsResponse';

export default class ArticlesService {
    static async getTags() :Promise<String[]|undefined>{
        try {
            const response = await get(`/tags`);
            return (response.data.tags);
        }
        catch(err){
            console.log("failed to fetch");
        }
    }
    static async removeFavorited(slug: string) :Promise<Article|undefined>{
        try {
            const response = await deleteApi(`articles/${slug}/favorite`);
            return (response.data.article);
        }
        catch(err){
            console.log("failed to fetch");
        }
    }

    static async addFavorited(slug: string) :Promise<Article|undefined>{
        try {
            const response = await post(`articles/${slug}/favorite`,null);
            return (response.data.article);
        }
        catch{
            console.log("failed to fetch");
        }
    }

    static async deleteComment(id: string, slug: string):Promise<void| undefined> {
        try {
            const response = await deleteApi(`articles/${slug}/comments/${id}`);
            return (response.data.comment);
        }
        catch{
            console.log("failed to fetch");
        }
    }

    static async addComment(comment: string,slug:string) :Promise<Comment| undefined> {
        try {
            const response = await post(`articles/${slug}/comments`, {comment:{body: comment}});
            return (response.data.comment);
        }
        catch{
            console.log("failed to fetch");
        }
    }

    static async deleteArticle(slug: string)  : Promise<void | undefined> {
        try {
            await deleteApi(`/articles/${slug}`);
        }
        catch{
            console.log("failed to fetch");
        }
    }

    static async editArticle(article: Article) : Promise<Article | undefined> {
        try {
            const response = await put(`/articles/${article.slug}`, article);
            return (response.data.article);
        }
        catch{
            console.log("failed to fetch");
        }
    }

    static async addNewArticle(article: any) : Promise<Article | undefined>  {
        try {
            debugger
            const response = await post("/articles", article);
            return (response.data.article);
        }
        catch{
            console.log("failed to fetch");
        }
    }
    static async getCommentsOfArticle(slug: string) : Promise<CommentsResponse | undefined>  {
        try {
            const response = await get(`/articles/${slug}/comments`);
            return (response.data as CommentsResponse);
        }
        catch{
            console.log("failed to fetch");
        }
    }
    static async getArticleBySlug(slug: string) : Promise<Article | undefined> {
        try {
            const response = await get("/articles",slug);
            return (response.data.article as Article);
        }
        catch{
            console.log("failed to fetch");
        }
    }
    
    static async getAllArticles(params: any) : Promise<Articles | undefined> {
        try {
            const response = await query("/articles", {
                params: params
            });
            return (response.data as Articles);
        }
        catch{
            console.log("failed to fetch");
        }
    };
    
}