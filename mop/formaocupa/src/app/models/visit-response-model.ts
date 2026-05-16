export interface VisitResponseModel {
    status: number,
    error: boolean,
    messages: string,
    data: {
        id: string,
        date: string,
        stand_id: string,
        user_id: string
    }
}
