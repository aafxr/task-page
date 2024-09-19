import {BXAuth} from "./BXAuth";
import {ajax} from "./ajax";

const HOST_NAME = process.env.REACT_APP_HOST_NAME || ''
const PATH_NAME = process.env.REACT_APP_PATH_NAME || ''

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || ''
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || ''

const baseURL = `https://${HOST_NAME}`


const bxAuth = new BXAuth(baseURL, CLIENT_ID, CLIENT_SECRET)

console.log('HOST_NAME + PATH_NAME   =   ', baseURL + PATH_NAME)

// @ts-ignore
window.bxAuth =
    bxAuth

// @ts-ignore
window.getAuth = () =>
    bxAuth.getAuth()
        .then(r => !r && window.history.pushState(null, '', baseURL + PATH_NAME))
        .catch(console.error)

bxAuth.getAuth()
    .then(r => !r && window.history.pushState(null, '', baseURL + PATH_NAME))
    .catch(console.error)





export const bitrix = {
    callMethod(
        methodName:string,
        params: Record<string, any> = {},
        cb: (res: any) => unknown = () => {},
        fail:(e: Error) => unknown = () => {}
    ){
        new Promise(async (resolve, rej ) => {
            const res = await fetch(bitrix._callMethodURL(methodName, params))
                .then(res => res.json())
                .catch(e => fail(e))
            cb(res)
        })
            .catch(fail)
    },

    _callMethodURL(methodName:string, params: Record<string, any>){
        let _params = ''
        ajax.prepareData(params, '', (data = '') => _params = data )

        const sp =  new URLSearchParams()
        sp.append('auth', bxAuth.access_token)

        return baseURL + '/rest/' + methodName + '?' + _params + '&' + sp.toString()
    }
}






// @ts-ignore
window.bitrix = bitrix
