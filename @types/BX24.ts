import {Task} from "../src/classes/Task";

export interface BX24{
    init: (f: Function) => unknown
    install: (f: Function | string) => unknown
    installFinish: () => unknown
    getAuth: () => GetAuthResponse | false
    callMethod: (
        method:string,
        options: CallMethodOptions,
        cb: (res: any ) => unknown
    ) => CallMethodResponse

}

type GetAuthResponse = {
    access_token: string
    expires_in: Date
    refresh_token: string
    domain: string
    member_id: string
}

interface CallMethodResponse{
    answer:{
        result: Task[]
    }
}

interface CallMethodOptions{
    [k: string]: any
}