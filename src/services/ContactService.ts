import {AppContextState} from "../context/AppContext";
import {BXContact} from "../classes/BXContact";
import {ErrorService} from "./ErrorService";
import {Task} from "../classes/Task";
import {fetchRestAPI} from "../api";

const contactsMap = new Map<BXContact['ID'], BXContact>()

export class ContactService {
    static getContacts(ctx: AppContextState, task: Task): Promise<BXContact[]> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!task.hasContact()) return []
                let ids = task.getContactsId()
                let contacts: BXContact[] = []
                ids = ids.filter(id => {
                    if(contactsMap.has(id)) {
                        contacts.push(contactsMap.get(id)!)
                        return false
                    }
                    return true
                })

                for (const id of ids) {
                    const res = await fetchRestAPI<BXContact>('crm.contact.get', {filter: {ID: id}})
                    const c = new BXContact(res.result)
                    contactsMap.set(c.ID, c)
                    contacts.push(c)
                }

                return contacts
            } catch (e) {
                ErrorService.handleError(ctx)(e as Error)
            }
        })
    }
}
