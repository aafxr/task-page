export class BXPerson{
    ACTIVE: boolean = false
    DATE_REGISTER: Date = new Date(0)
    EMAIL: string = ''
    ID: string = ''
    IS_ONLINE: string = ''
    LAST_ACTIVITY_DATE: any
    LAST_LOGIN: string = ''
    LAST_NAME: string = ''
    NAME: string = ''
    PERSONAL_BIRTHDAY: string = ''
    PERSONAL_CITY: string = ''
    PERSONAL_COUNTRY: string = ''
    PERSONAL_FAX: string = ''
    PERSONAL_GENDER: string = ''
    PERSONAL_ICQ: string = ''
    PERSONAL_MAILBOX: string = ''
    PERSONAL_MOBILE: string = ''
    PERSONAL_NOTES: string = ''
    PERSONAL_PAGER: string = ''
    PERSONAL_PHONE: string = ''
    PERSONAL_PROFESSION: string = ''
    PERSONAL_STATE: string = ''
    PERSONAL_STREET: string = ''
    PERSONAL_WWW: string = ''
    PERSONAL_ZIP: string = ''
    SECOND_NAME: string = ''
    TIMESTAMP_X: any = {}
    TIME_ZONE: string = ''
    TIME_ZONE_OFFSET: string = ''
    TITLE: string = ''
    UF_DEPARTMENT: number[] = []
    UF_EMPLOYMENT_DATE: string = ''
    UF_PHONE_INNER: string = ''
    USER_TYPE: string = ''
    WORK_CITY: string = ''
    WORK_COMPANY: string = ''
    WORK_COUNTRY: string = ''
    WORK_DEPARTMENT: string = ''
    WORK_FAX: string = ''
    WORK_MAILBOX: string = ''
    WORK_NOTES: string = ''
    WORK_PAGER: string = ''
    WORK_PHONE: string = ''
    WORK_POSITION: string = ''
    WORK_PROFILE: string = ''
    WORK_STATE: string = ''
    WORK_STREET: string = ''
    WORK_WWW: string = ''
    WORK_ZIP: string = ''
    XML_ID: string = ''

    constructor(p: Partial<BXPerson> = {}) {
        for (const k of Object.keys(p)){
            if(k.startsWith('DATE')){
                //@ts-ignore
                this[k] = new Date(p[k])
            }
            //@ts-ignore
            this[k] = p[k]
        }
    }
}