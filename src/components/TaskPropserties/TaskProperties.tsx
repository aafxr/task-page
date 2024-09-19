import React from 'react';

import './TaskProperties.css'

    type TaskProperty = {
        property: string;
        value: string;
    }

type TaskPropertiesProps = {
    data: TaskProperty[];
}


export const TaskProperties = ({ data }: TaskPropertiesProps) => {
    return (
        <table className="bx-table">
            {/*<thead>*/}
            {/*<tr>*/}
            {/*    <th className="bx-table-header">Свойство</th>*/}
            {/*    <th className="bx-table-header">Значение</th>*/}
            {/*</tr>*/}
            {/*</thead>*/}
            <tbody>
            {data.map((item, index) => (
                <tr key={index} className="bx-table-row">
                    <td className="bx-table-cell">{item.property}</td>
                    <td className="bx-table-cell">{item.value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};