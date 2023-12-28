export interface UserModel {
  avatarUrl?: string;
  birthDate?: string;
  country?: string;
  createdAt: string;
  deletedAt?: string;
  email: string;
  firstName: string;
  gender?: string;
  id: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  updatedAt: string;
}

export interface PostModel {
  author: UserModel;
  authorId: string;
  createdAt: string;
  deletedAt?: string;
  description: string;
  id: string;
  isLiked: boolean;
  likesCount: number;
  mediaUrl: string;
  title: string;
  updatedAt: string;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  Main: undefined;
  Profile: undefined;
  Favorites: undefined;
  MyPosts: undefined;
  CreatePost: undefined;
};
