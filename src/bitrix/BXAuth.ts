type AppCredentials = {
    client_id: string
    state?: string
} | {
    code: string
    domain: string
    member_id: string
    scope: string
    server_domain: string
    state?: string
}

type OAuthData = {
    access_token: string
    expires: number
    expires_in: number
    scope: string
    domain: string
    server_endpoint: string
    status: string
    client_endpoint: string
    member_id: string
    user_id: number,
    refresh_token: string
}


export class BXAuth{
    /** origin like: https://example.com */
    baseURL:string

    client_id: string
    client_secret: string

    appCredentials: AppCredentials | null = null
    oauthData: OAuthData | null = null





    constructor( baseURL: string, client_id: string, client_secret: string) {
        this.baseURL = baseURL
        this.client_id = client_id
        this.client_secret = client_secret
    }


    async getAuth() {
        this.appCredentials = null
        this.oauthData = null

        const authResponse: any = await fetch(`${this.baseURL}/oauth/authorize/?client_id=${this.client_id}&state=JJHgsdgfkdaslg7lbadsfg`).catch(console.error)

        if (authResponse && authResponse.url) {
            this.appCredentials = BXAuth.parseCredentials(authResponse.url)
        }

        if(!this.appCredentials || 'client_id' in this.appCredentials) return false

        const params = BXAuth.submitParamsForCredentials(this.client_id, this.client_secret, this.appCredentials)

        if (!params) return false

        const tokens = await fetch(this.baseURL + '/oauth/token/?' + params)
            .then((res) => res.json())
            .catch(console.error)

        console.log(tokens)

        this.oauthData = tokens

        return true
    }


    isAuthenticated(): boolean {
        return !!this.oauthData
    }

    get access_token(){
        return this.oauthData?.access_token || ''
    }

    get refresh_token(){
        return this.oauthData?.refresh_token || ''
    }

    get user_id(){
        return this.oauthData?.user_id || ''
    }


    static parseCredentials(url: string): AppCredentials {
        const params = Array.from(new URL(url).searchParams.entries()).reduce((a, [k, v]) => {
            a[k] = v
            return a
        }, {} as Record<string, any>)
        return params as AppCredentials
    }


    static submitParamsForCredentials(client_id: string, client_secret: string, credentials: AppCredentials): string {
        if (!credentials || !('code' in credentials)) return ''

        const paramsForToken = new URLSearchParams()
        paramsForToken.append('grant_type','authorization_code')
        paramsForToken.append('client_id', client_id)
        paramsForToken.append('client_secret',client_secret)
        paramsForToken.append('code',credentials.code)

        return paramsForToken.toString()
    }
}