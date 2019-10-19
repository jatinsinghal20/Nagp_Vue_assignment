import Article from "./Article";

export default interface Articles {
    articles?: (Article)[] | null;
    articlesCount: number;
}
