import React, {ReactNode} from 'react';

import './TaskProperties.css'

    type TaskProperty = {
        property: string;
        value: ReactNode;
    }

type TaskPropertiesProps = {
    data: TaskProperty[];
}


export const TaskProperties = ({ data }: TaskPropertiesProps) => {
    return (
        <table className="bx-table">
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