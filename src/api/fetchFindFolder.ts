import {appFetch} from "../axios";
import {BASE_URL} from "../App";
import {BXFolder} from "../classes/BXFolder";


type FetchFindFolderResponse = {
    ok: boolean
    crm?: BXFolder
    folder?: BXFolder
}


export async function fetchFindFolder(name: string): Promise<FetchFindFolderResponse | undefined>{
    const userId = Telegram.WebApp.initDataUnsafe.user?.id || -1
    const res = await appFetch.get(BASE_URL + `api/searchFolder/?folderName=${name}&id=${userId}`)
    if(res.status > 199 && res.status < 300) {
        if(res.data.crm) res.data.crm = new BXFolder(res.data.crm)
        if(res.data.folder) res.data.folder = new BXFolder(res.data.folder)
        return res.data
    }
}