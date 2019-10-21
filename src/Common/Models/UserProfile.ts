export default interface UserProfile {
    username: string;
    bio?: string | null;
    image?: string;
    following: boolean;
}