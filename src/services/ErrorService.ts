import {AppContextState} from "../context/AppContext";
import {errors} from "../errors";
import React, {ReactNode} from "react";
import {AuthMessage} from "../components/AuthMessage";

/**
 * преобразует сообщение  об ошибке в читаемое сообщение
 * @param errorMessage
 */
function errorMessageToReadableMessage(errorMessage: string): ReactNode {

    switch (errorMessage) {
        case errors.BX_EXPIRED_TOKEN:
        case errors.UNAUTHORIZED:
            return AuthMessage()
        case errors.BX_PAYMENT_REQUIRED:
            return 'Приложение временно не достсупно'
        case errors.BX_INSUFFICIENT_SCOPE:
            return 'Недостаточно прав'
        default:
            return errorMessage
    }
}


export class ErrorService {
    static handleError(ctx: AppContextState) {
        return (e: Error) => {
            // handle error here ...
            ctx.updateAppContext(s => ({...s, error: errorMessageToReadableMessage(e.message)}))
            console.error('[ErrorService] ', e)
        }
    }
}