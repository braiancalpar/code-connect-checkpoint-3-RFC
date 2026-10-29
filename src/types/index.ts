export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string | null;
  bio?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Author {
  id: string;
  name: string;
  username?: string;
  avatar?: string | null;
}

export interface Comment {
  id: number;
  text: string;
  postId: number;
  author: Author;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: number;
  cover: string;
  imageUrl?: string;
  title: string;
  slug: string;
  body: string;
  markdown: string;
  likes: number;
  author: Author;
  comments: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ApiErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}
