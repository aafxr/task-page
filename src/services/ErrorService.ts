import {AppContextState} from "../context/AppContext";
import {errors} from "../errors";
import {ReactNode} from "react";
import {AuthMessage} from "../components/AuthMessage";

/**
 * преобразует сообщение  об ошибке в читаемое сообщение
 * @param errorMessage
 */
function errorMessageToReadableMessage(errorMessage: string): {node: ReactNode, code: number} {

    switch (errorMessage) {
        case errors.BX_EXPIRED_TOKEN:
        case errors.UNAUTHORIZED:
        case errors.PERMISSION_DENIED:
            return {node: AuthMessage(), code: 401}
        case errors.BX_PAYMENT_REQUIRED:
            return {node: 'Приложение временно не достсупно', code: 500}
        case errors.BX_INSUFFICIENT_SCOPE:
            return {node: 'Недостаточно прав', code: 403}
        default:
            return {node: errorMessage, code: 500}
    }
}


export class ErrorService {
    static handleError(ctx: AppContextState) {
        return (e: Error) => {
            // handle error here ...
            const err = errorMessageToReadableMessage(e.message)
            ctx.updateAppContext(s => ({...s, error: err.node, errorCode: err.code}))
            console.error('[ErrorService] ', e)
        }
    }
}