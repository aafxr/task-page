import {BXAuth} from "./BXAuth";
import {ajax} from "./ajax";
import {appFetch} from "../axios";
import {AxiosResponse} from "axios";

const HOST_NAME = process.env.REACT_APP_HOST_NAME || ''
// const PATH_NAME = process.env.REACT_APP_PATH_NAME || ''

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || ''
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || ''

const baseURL = `https://${HOST_NAME}`


// export const bxAuth = new BXAuth(baseURL, CLIENT_ID, CLIENT_SECRET)


// @ts-ignore
// window.bxAuth = bxAuth

// bxAuth.refresh()
//     .then(r => console.log('auth: ', r))
//     .catch(console.error)

export const bitrix = {}
// export const bitrix = {
//     callMethod(
//         methodName: string,
//         params: Record<string, any> = {},
//         cb: (res: any) => unknown = () => {},
//         fail: (e: Error) => unknown = () => {}
//     ) {
//         new Promise(async (resolve, rej) => {
//             try {
//                 if(!bxAuth.oauthData) await bxAuth.auth()
//                 const res = await appFetch(bitrix._callMethodURL(methodName, params)) as AxiosResponse
//                 if (res && res.status >=200 && res.status < 300) cb(res.data)
//             } catch (e){
//                 rej(e)
//             }
//         })
//             .catch(fail)
//     },
//
//     async getAuth(): Promise<BXAuth['oauthData'] | null> {
//         if (bxAuth.isAuthenticated()){
//             return bxAuth.oauthData!
//         }
//
//         if (bxAuth.refresh_token && await bxAuth.refresh()){
//             return bxAuth.oauthData!
//         }
//
//         if (bxAuth.access_token && await bxAuth.auth()){
//             return bxAuth.oauthData!
//         }
//         return bxAuth.oauthData
//     },
//
//     _callMethodURL(methodName: string, params: Record<string, any>) {
//         let _params = ''
//         ajax.prepareData(params, '', (data = '') => _params = data)
//
//         const sp = new URLSearchParams()
//         sp.append('auth', bxAuth.access_token)
//
//         return baseURL + '/rest/' + methodName + '?' + _params + '&' + sp.toString()
//     },
//
//     logout(){
//         bxAuth.oauthData = null
//         bxAuth.appCredentials = null
//     }
// }
//
//
// // @ts-ignore
// window.bitrix = bitrix
