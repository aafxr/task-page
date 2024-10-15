import React from 'react';
import {useQuery} from "../../hooks/useQuery";
import {Navigate} from "react-router-dom";
import {BASE_URL} from "../../App";


type QueryNavProps = {
    name?: string
}


export function QueryNav({name = 'page'}: QueryNavProps) {
    const query = useQuery()
    const param = query.get(name)
    if(!param) return null
    return <Navigate to={BASE_URL + param} />
}

