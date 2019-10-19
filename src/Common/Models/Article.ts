import Profile from "./Profile";

export default interface Article {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList?: (string | null)[] | null;
    description: string;
    author: Profile;
    favorited: boolean;
    favoritesCount: number;
}