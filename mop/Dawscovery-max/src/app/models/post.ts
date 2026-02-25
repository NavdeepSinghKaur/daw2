export interface Post {
    id: string;
    title: string;
    images: string[];
    description: string;
    address: string;
    rating: {
        noise: number;
        massification: number;
        price: number;
        aesthetics: number;
    };
    author: string;
    authorName: string;
    savedBy?: string[];
    createdAt: string;
    likes: string[];
}