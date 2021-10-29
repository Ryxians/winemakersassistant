import React, {FC, useState} from 'react';
import {Blended_Batch} from "@entities/Blended_Batch"
import {Batch} from "@entities/Batch"
import {Link} from "react-router-dom";

interface Props {
    blend: Blended_Batch
    setBatch:  React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
}

export const BlendListC: FC<Props> = ({blend, setBatch}) => {
    const {blend_id, wine, blending_date} = blend;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(blending_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()

    const optionStyles = "list-group-item btn";
    return (
        <>
            <tr onClick={() => setSelected(!isSelected)}>
                <th scope="row">{blend_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>?</td>
            </tr>
            {isSelected && (
                <tr className="table-info list-group">
                    <td>
                    <ul>
                        <li className={optionStyles}>
                            <Link onClick={() => setBatch(blend)} to={{pathname: "/winelog"}} >
                                Complete Log
                            </Link>
                        </li>
                        <li className={optionStyles}>Output</li>
                    </ul>
                    </td>
                </tr>
            )}
        </>
    );
};