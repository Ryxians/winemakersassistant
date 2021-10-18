import React, {FC, useState} from 'react';
import {Batch} from '@server/database/entities/Batch'
import {Link, Redirect} from "react-router-dom";

interface Props {
    batch: Batch
    setBatch:  React.Dispatch<React.SetStateAction<Batch | undefined>>
}

export const BatchListC: FC<Props> = ({batch, setBatch}) => {
    const {batch_id, wine, starting_tank, start_date} = batch;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(start_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()

    const optionStyles = "list-group-item btn";
    return (
        <>
            <tr onClick={() => setSelected(!isSelected)}>
                <th scope="row">{batch_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>{starting_tank}</td>
            </tr>
            {isSelected && (
                <tr className="table-info list-group">
                    <ul>
                        <li className={optionStyles} >
                            <Link onClick={() => setBatch(batch)} to={{pathname: "/fermentation"}}>
                                Fermenting
                            </Link>
                        </li>
                        <li className={optionStyles}>Racking</li>
                        <li className={optionStyles}>Filtering</li>
                        <li className={optionStyles}>Output</li>
                    </ul>
                </tr>
            )}
        </>
    );
};