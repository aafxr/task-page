
const HOST_NAME = process.env.REACT_APP_HOST_NAME || ''

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || ''
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || ''

const baseURL = `https://${HOST_NAME}`


// const axios_bx = axios.create({
//     baseURL: `https://${HOST_NAME}`,
// })


export const bitrix = {}

export async function getAuth() {
    const authResponse: any = await fetch(`${baseURL}/oauth/authorize/?client_id=${CLIENT_ID}&state=JJHgsdgfkdaslg7lbadsfg`).catch(console.error)
    if (!authResponse) return {}

    console.log(authResponse)
    const params = Array.from(new URL(authResponse.url).searchParams.entries()).reduce((a, [k, v]) => {
        a[k] = v
        return a
    }, {} as Record<string, any>)
    console.log(params)

    const paramsForToken = new URLSearchParams()
    paramsForToken.append('grant_type','authorization_code')
    paramsForToken.append('client_id', CLIENT_ID)
    paramsForToken.append('client_secret',CLIENT_SECRET)
    paramsForToken.append('code',params.code)

    const tokens = await fetch(baseURL + '/oauth/token/?' + paramsForToken.toString()).catch(console.error)

    console.log(tokens)
    return tokens
}

