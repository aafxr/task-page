type GrantType = 'refresh_token' | 'authorization_code'

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


export class BXAuth {
    /** origin like: https://example.com */
    baseURL: string

    client_id: string
    client_secret: string

    appCredentials: AppCredentials | null = null
    oauthData: OAuthData | null = null

    authUpdate = false


    constructor(baseURL: string, client_id: string, client_secret: string) {
        this.baseURL = baseURL
        this.client_id = client_id
        this.client_secret = client_secret

        this.auth = this.auth.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    /**
     * отправляет запрос на получение токенов доступа к апи
     */
    async auth(): Promise<boolean> {
        try{
            this.authUpdate = true
            const authResponse: any = await fetch(`${this.baseURL}/oauth/authorize/?client_id=${this.client_id}&state=JJHgsdgfkdaslg7lbadsfg`).catch(console.error)

            if(!authResponse) return false

            if (authResponse.url) {
                this.appCredentials = BXAuth.parseCredentials(authResponse.url)
            }

            if (!this.appCredentials || !('member_id' in this.appCredentials)) return false

            const params = BXAuth.submitParamsForCredentials(this, 'authorization_code')

            if (!params) return false

            this.oauthData = await fetch(this.baseURL + '/oauth/token/?' + params)
                .then((res) => res.json())
                .catch(console.error)

            return this.isAuthenticated()
        }finally {
            this.authUpdate = false
        }
    }


    /**
     * обнавляет токен доступа к апи
     */
    async refresh(): Promise<boolean> {
        try {
            this.authUpdate = true

            const refresh_token = this.refresh_token
            if (!refresh_token) return false

            const params = BXAuth.submitParamsForCredentials(this, 'refresh_token')

            if (!params) return false

            this.oauthData = await fetch(this.baseURL + '/oauth/token/?' + params)
                .then((res) => res.json())
                .catch(console.error)

            return true
        } finally {
            this.authUpdate = false
        }
    }


    isAuthenticated(): boolean {
        return !!this.oauthData
    }

    get access_token() {
        return this.oauthData?.access_token || ''
    }

    get refresh_token() {
        return this.oauthData?.refresh_token || ''
    }

    get user_id() {
        return this.oauthData?.user_id || ''
    }


    static parseCredentials(url: string): AppCredentials {
        const params = Array.from(new URL(url).searchParams.entries()).reduce((a, [k, v]) => {
            a[k] = v
            return a
        }, {} as Record<string, any>)
        return params as AppCredentials
    }


    static submitParamsForCredentials(bxAuth: BXAuth, grant_type: GrantType): string {
        if (!bxAuth.appCredentials || !('code' in bxAuth.appCredentials)) return ''
        if(grant_type === 'refresh_token' && !bxAuth.refresh_token) return ''

        const {client_id, client_secret} = bxAuth

        const paramsForToken = new URLSearchParams()
        paramsForToken.append('grant_type', grant_type)
        paramsForToken.append('client_id', client_id)
        paramsForToken.append('client_secret', client_secret)

        switch (grant_type){
            case "authorization_code":
                paramsForToken.append('code', bxAuth.appCredentials.code)
                break
            case "refresh_token":
                paramsForToken.append('refresh_token', bxAuth.refresh_token)
        }

        return paramsForToken.toString()
    }
}