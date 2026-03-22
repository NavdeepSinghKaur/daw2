import { Post } from "./post";

export interface PostList {
    author: string;
    createdAt: Date;
    id?: string;
    name: string;
    posts: Post[];
    shared: string[];
};
