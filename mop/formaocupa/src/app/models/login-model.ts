export interface LoginModel {
    status: number;
    error: boolean;
    messages: string;
    userId: string;
    data: {
        token: string
    }
}
