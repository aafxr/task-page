import {AppContextState} from "../context/AppContext";
import {BXContact} from "../classes/BXContact";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchRestAPI} from "../api";

const contactsMap = new Map<BXContact['ID'], BXContact>()

export class ContactService {
    /**
     * получить список контактов указанных в задаче
     * @param ctx
     * @param task
     */
    static getContacts(ctx: AppContextState, task: Task): Promise<BXContact[]> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!task.hasContact()) {
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
                    const res = await fetchRestAPI<BXContact>('crm.contact.get', {ID: id})
                    const c = new BXContact(res.result)
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

                const res = await fetchRestAPI<BXContact>('crm.contact.get', {id})
                const c = new BXContact(res.result)
                contactsMap.set(c.ID, c)
                return c
            } catch (e){
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }
}
