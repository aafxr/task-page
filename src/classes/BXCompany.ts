import {YesNoType} from "../../@types/YesNoType";
import {ContactFieldType} from "../../@types/ContactFieldType";

export class BXCompany{
    ADDRESS: string | null = null
    ADDRESS_2: string | null = null
    ADDRESS_CITY: string | null = null
    ADDRESS_COUNTRY: string | null = null
    ADDRESS_COUNTRY_CODE: string | null = null
    ADDRESS_LEGAL: string | null = null
    ADDRESS_LOC_ADDR_ID: string | null = null
    ADDRESS_POSTAL_CODE: string | null = null
    ADDRESS_PROVINCE: string | null = null
    ADDRESS_REGION: string | null = null
    ASSIGNED_BY_ID: string = ""
    BANKING_DETAILS: null = null
    COMMENTS: string | null = null
    COMPANY_TYPE: string | null = null
    CREATED_BY_ID: string | null = null
    CURRENCY_ID: string | null = null
    DATE_CREATE: Date | null = null
    DATE_MODIFY: Date | null = null
    EMPLOYEES: string | null = null
    EMAIL: string | null = null
    HAS_EMAIL: YesNoType = 'N'
    HAS_IMOL: YesNoType = 'N'
    HAS_PHONE: YesNoType = 'N'
    ID: string = ''
    INDUSTRY: string = ''
    IS_MY_COMPANY: YesNoType = 'N'
    LAST_ACTIVITY_BY: string = ''
    LAST_ACTIVITY_TIME: Date | null = null
    LEAD_ID: string | null = null
    LOGO: string | null = null
    MODIFY_BY_ID: string | null = null
    OPENED: YesNoType = 'N'
    ORIGINATOR_ID: string | null = null
    ORIGIN_ID: string = ''
    ORIGIN_VERSION: string | null = null
    PARENT_ID_132: string | null = null
    PHONE: ContactFieldType[] = []
    REG_ADDRESS: string | null = null
    REG_ADDRESS_2: string | null = null
    REG_ADDRESS_CITY: string | null = null
    REG_ADDRESS_COUNTRY: string | null = null
    REG_ADDRESS_COUNTRY_CODE: string | null = null
    REG_ADDRESS_LOC_ADDR_ID: string | null = null
    REG_ADDRESS_POSTAL_CODE: string | null = null
    REG_ADDRESS_PROVINCE: string | null = null
    REG_ADDRESS_REGION: string | null = null
    REVENUE: string | null = null
    TITLE: string = ''
    UF_ADDR_TEXT: string = ''
    UF_BLOCK_TYPE: string = ''
    UF_CATEGORY_CONSUMER: any | false = false
    UF_CATEGORY_DOGOVOR: string = ''
    UF_CATEGORY_IMPORTANT: any | false = false
    UF_CATEGORY_PRICE: any | false = false
    UF_CATEGORY_PRODUCTS: any | false = false
    UF_CATEGORY_PRODUCT_TYPES: any | false = false
    UF_CATEGORY_PROMO: any | false = false
    UF_CATEGORY_PROMO_TYPES: any | false = false
    UF_CATEGORY_RETAIL_SIZE: any | false = false
    UF_CATEGORY_STATUS: any | false = false
    UF_CATEGORY_STOCK: any | false = false
    UF_CATEGORY_TYPE: any | false = false
    UF_CITY: string = ''
    UF_CITY_LIST: string = ''
    UF_COMPANY_CATEGORIES: ContactFieldType[] = []
    UF_CRM_1712224539: string = ''
    UF_CRM_1712224541: string = ''
    /** город */
    UF_CRM_1712158211014: string = ''
    UF_CRM_1720609381333: string = ''
    UF_CRM_1721644691683: string = ''
    UF_CRM_1724061409965: string = ''
    UF_DEPARTMENT: string = ''
    UF_EXT_DATE_CREATE: Date | null = null
    UF_IS_COPY: string = ''
    UF_LAST_ACTIVITY: Date | null = null
    UF_MAIN_COPY: string = ''
    UF_PROPERTY_VALUES: ContactFieldType[] = []
    UF_SOURCE: string = ''
    UF_SOURCE_IB: string = ''
    UF_SOURCE_NAME: string = ''
    UF_STAGE: string = ''
    UF_START_FORM: string = ''
    UTM_CAMPAIGN: any | null = null
    UTM_CONTENT: any | null = null
    UTM_MEDIUM: any | null = null
    UTM_SOURCE: any | null = null
    UTM_TERM: any | null = null
    WEB: ContactFieldType[] = []


    constructor(c: Partial<BXCompany> = {}) {
        Object.entries(c).forEach(([k, v]) => {
            //@ts-ignore
            this[k] = v
        })

        if(this.DATE_CREATE) this.DATE_CREATE = new Date(this.DATE_CREATE)
        if(this.DATE_MODIFY) this.DATE_MODIFY = new Date(this.DATE_MODIFY)
        if(this.LAST_ACTIVITY_TIME) this.LAST_ACTIVITY_TIME = new Date(this.LAST_ACTIVITY_TIME)
        if(this.UF_EXT_DATE_CREATE) this.UF_EXT_DATE_CREATE = new Date(this.UF_EXT_DATE_CREATE)
        if(this.UF_LAST_ACTIVITY) this.UF_LAST_ACTIVITY = new Date(this.UF_LAST_ACTIVITY)
    }
}