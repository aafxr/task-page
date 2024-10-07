export class BXFolder{
    ID:string = ''
    NAME:string = ''
    CODE:string | null = null
    STORAGE_ID:string = ''
    TYPE:string = ''
    PARENT_ID:string = ''
    DELETED_TYPE:string = ''
    CREATE_TIME: Date | null = null
    UPDATE_TIME: Date | null = null
    DELETE_TIME: Date | null = null
    CREATED_BY: string = ''
    UPDATED_BY: string = ''
    DELETED_BY: string = ''
    DETAIL_URL: string = ''

    constructor(f: Partial<BXFolder> = {}) {
        Object.entries(f).forEach(([k,v]) => {
            //@ts-ignore
            if(k.includes('TIME')) this[k] = new Date(v)
            //@ts-ignore
            else this[k] = v
        })
    }
}