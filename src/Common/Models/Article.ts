import UserProfile from "./UserProfile";

export default interface Article {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList?: (string | null)[] | null;
    description: string;
    author: UserProfile;
    favorited: boolean;
    favoritesCount: number;
}