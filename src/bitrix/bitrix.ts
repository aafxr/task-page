import {errors} from "../errors";
import {BXAuth} from "./BXAuth";
import {ajax} from "./ajax";

const HOST_NAME = process.env.REACT_APP_HOST_NAME || ''
// const PATH_NAME = process.env.REACT_APP_PATH_NAME || ''

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || ''
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || ''

const baseURL = `https://${HOST_NAME}`


const bxAuth = new BXAuth(baseURL, CLIENT_ID, CLIENT_SECRET)


// @ts-ignore
window.bxAuth = bxAuth

bxAuth.refresh()
    .then(r => console.log('auth: ', r))
    .catch(console.error)


export const bitrix = {
    callMethod(
        methodName: string,
        params: Record<string, any> = {},
        cb: (res: any) => unknown = () => {
        },
        fail: (e: Error) => unknown = () => {
        }
    ) {
        new Promise(async (resolve, rej) => {
            if (!bxAuth.isAuthenticated()) {
                let i = 0
                for (; i < 3; i++){
                    if (await bxAuth.refresh()) break
                }

                if (i >= 3) {
                    fail(new Error(errors.UNAUTHORIZED))
                    return
                }
            }

            const res = await fetch(bitrix._callMethodURL(methodName, params))
                .then(res => res.json())
                .catch(fail)
            cb(res)
        })
            .catch(fail)
    },

    async getAuth(): Promise<Exclude<BXAuth['oauthData'], null>> {
        if (bxAuth.isAuthenticated()){
            return bxAuth.oauthData!
        }

        if (await bxAuth.refresh()){
            return bxAuth.oauthData!
        }
        else throw new Error(errors.UNAUTHORIZED)
        // return bxAuth.oauthData || {
        //     access_token: '',
        //     expires: 0,
        //     expires_in: 0,
        //     scope: '',
        //     domain: '',
        //     server_endpoint: '',
        //     status: '',
        //     client_endpoint: '',
        //     member_id: '',
        //     user_id: 0,
        //     refresh_token: '',
        // }
    },

    _callMethodURL(methodName: string, params: Record<string, any>) {
        let _params = ''
        ajax.prepareData(params, '', (data = '') => _params = data)

        const sp = new URLSearchParams()
        sp.append('auth', bxAuth.access_token)

        return baseURL + '/rest/' + methodName + '?' + _params + '&' + sp.toString()
    }
}


// @ts-ignore
window.bitrix = bitrix
