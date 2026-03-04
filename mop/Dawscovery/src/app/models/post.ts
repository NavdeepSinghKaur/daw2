export interface Post {
    address: string;
    author: string;
    createdAt: string;
    description: string;
    images: string;
    likes: number;
    rating: {
        aesthetics: number;
        massification: number;
        noise: number;
        price: number;
    };
    savedBy: string[];
};
