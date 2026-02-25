export interface User {
    id: string;
    username: string;
    password?: string;
    connections?: string[];
    pendingConnections?: {
        from: string[];
        to: string[];
    }
    posts?: string[];
    lists?: string[];
    pfp?: string;
}