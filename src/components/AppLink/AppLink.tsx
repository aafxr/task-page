import {useNavigate} from "react-router-dom";
import React, {ReactNode} from 'react';
import clsx from "clsx";


import './AppLink.css'


type AppLinkProps = {
    to?: string,
    className?: string
    children?:ReactNode
}


export function AppLink({className, to, children}: AppLinkProps) {
    const navigate = useNavigate()


    function handleClick(){
        if(to){
            navigate(to)
        }
    }


    return (
        <span
            className={clsx('appLink', className)}
            onClick={handleClick}
        >{children}</span>
    );
}

