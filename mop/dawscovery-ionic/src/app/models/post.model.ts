export interface Post {
    address: string;
    author: string;
    id?: string;
    createdAt: string;
    description: string;
    images: string[];
    rating: {
        aesthetics: number;
        massification: number;
        noise: number;
        price: number;
    };
    savedBy: string[];
};
