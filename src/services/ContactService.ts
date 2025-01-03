import {AppContextState} from "../context/AppContext";
import {BXContact} from "../classes/BXContact";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {BXCompany} from "../classes/BXCompany";
import {fetchContact} from "../api/fetchContact";
import {fetchCompany} from "../api/fetchCompany";
import {fetchContactsListByCompany} from "../api/fetchContactsList";

const contactsMap = new Map<BXContact['ID'], BXContact>()
const companiesMap = new Map<BXCompany['ID'], BXCompany>()

export class ContactService {


    static async getContactsList(ctx: AppContextState){
        try {
            return await fetchContactsListByCompany()
        } catch (e){
            ErrorService.handleError(ctx)(e as Error)
            return []
        }
    }


    /**
     * получить список контактов указанных в задаче
     * @param ctx
     * @param task
     */
    static getContacts(ctx: AppContextState, task: Task): Promise<BXContact[]> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!task.hasContacts()) {
                    resolve([])
                    return
                }
                let ids = task.getContactsId()
                let contacts: BXContact[] = []
                ids = ids.filter(id => {
                    if (contactsMap.has(id)) {
                        contacts.push(contactsMap.get(id)!)
                        return false
                    }
                    return true
                })

                for (const id of ids) {
                    const res = await fetchContact(id)
                    if(!res) continue
                    const c = new BXContact(res)
                    contactsMap.set(c.ID, c)
                    contacts.push(c)
                }

                resolve(contacts)
            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }


    /**
     * получить контак по ид
     * @param ctx
     * @param contactID
     */
    static getContact(ctx: AppContextState, contactID: string): Promise<BXContact | undefined>{
        return new Promise(async (resolve, reject) => {
            try {
                const id = contactID.includes('_')
                    ? contactID.split('_')[1]
                    : contactID

                if(contactsMap.has(id)) return resolve(contactsMap.get(id))

                const res = await fetchContact(id)
                if(!res) return
                const c = new BXContact(res)
                contactsMap.set(c.ID, c)
                return c
            } catch (e){
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }


    /**
     * получение списка компаний
     * @param ctx
     * @param task
     */
    static getCompanies(ctx: AppContextState, task: Task): Promise<BXCompany[]>{
        return new Promise(async (resolve, reject) => {
            try {
                if (!task.hasCompanies()) {
                    resolve([])
                    return
                }
                let ids = task.getCompaniesId()
                let companies: BXCompany[] = []
                ids = ids.filter(id => {
                    if (companiesMap.has(id)) {
                        companies.push(companiesMap.get(id)!)
                        return false
                    }
                    return true
                })

                for (const id of ids) {
                    const res = await fetchCompany(id)
                    if(!res) continue
                    const c = new BXCompany(res)
                    companiesMap.set(c.ID, c)
                    companies.push(c)
                }

                resolve(companies)
            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }


    /**
     * получение контакта по ид
     * @param ctx
     * @param companyId
     */
    static getCompany(ctx: AppContextState, companyId: string): Promise<BXCompany>{
        return new Promise(async (resolve, reject) => {
            try {
                const id = companyId.includes('_')
                    ? companyId.split('_')[1]
                    : companyId

                if(companiesMap.has(id)) return resolve(companiesMap.get(id)!)

                const res = await fetchCompany(id)
                if(!res) return
                const c = new BXCompany(res)
                companiesMap.set(c.ID, c)
                return c
            } catch (e){
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }
}
