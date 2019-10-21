import UserProfile from './UserProfile';

export default interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: UserProfile;
  }