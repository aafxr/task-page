export interface IBXTimestamp {
    date_finish: string
    date_start: string
    duration: number
    finish: number
    processing: number
    start: number
}

export interface IBXErrorResponse {
    error: string
    error_description: string
}

export interface IBXSuccessResponse<T> {
    next: number
    total: number
    result: T
    time: IBXTimestamp
}


export type IBXResponse <T>= IBXErrorResponse | IBXSuccessResponse<T>