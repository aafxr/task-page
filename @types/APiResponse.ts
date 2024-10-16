export type APiResponse<T> = {
    [key: string]: any
} & ({
    ok: true
    result: T
} | {
    ok: false
    message: string
})