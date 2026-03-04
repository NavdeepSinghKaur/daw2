export interface User {
    connections: number;
    id: number;
    username: string;
    posts: string[];
    pendingConnections: string[];
    password: string;
    postLists: string[];
};
