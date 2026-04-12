import { Post } from "./post.model";

export interface PostList {
    author: string;
    createdAt: Date;
    id?: string;
    name: string;
    posts: Post[];
    shared: string[];
};
