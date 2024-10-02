import clsx from "clsx";
import React from 'react';
import {useNavigate} from "react-router-dom";

import {BXContact} from "../../classes/BXContact";
import {BXCompany} from "../../classes/BXCompany";
import {Block} from "../Block";

import './CompanyPreview.css'


type ContactPreviewProps = {
    className?: string
    company: BXCompany
    contacts: BXContact[]
    to?: string
}


export function CompanyPreview({contacts, company, className, to}: ContactPreviewProps) {
    const navigate = useNavigate()


    function handleClick(){
        if(to) navigate(to)
    }


    return (
        <Block className={clsx('company', className)} onClick={handleClick}>
            <div className='company-name'>{company.TITLE}</div>
            {/*<div className='company-comment'>{company.COMMENTS}</div>*/}
            {/*{company.PHONE.length > 0 && company.PHONE.map(p => (*/}
            {/*    <a className='company-phone' href={`tel:${p.VALUE}`} onClick={e => e.stopPropagation()}>{p.VALUE}</a>*/}
            {/*))}*/}
        </Block>
    );
}

