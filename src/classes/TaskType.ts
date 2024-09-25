export class TaskType{
    ID:string = ''
    UF_CODE:string = ''
    UF_COMPANY_TYPE:string = ''
    UF_CONFIRM_REQUIRED:string = ''
    UF_DEPARTMENT:string = ''
    UF_NAME:string = ''
    UF_NEXT_ACTION: any | null = null
    UF_NEXT_AFTER_DAYS: any | null = null
    UF_SECTION: string = ''
    UF_XML_ID: any | null = null

    constructor(tt: Partial<TaskType> = {}) {
        for (const k of Object.keys(tt)){
            //@ts-ignore
            this[k] = tt[k]
        }
    }
}