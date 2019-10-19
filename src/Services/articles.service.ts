import { get, query } from "./api";
import Articles from '@/Common/Models/Articles';
import Article from '@/Common/Models/Article';

export default class ArticlesService {
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