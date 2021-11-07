import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Link} from "react-router-dom";
import {Modal} from "../modal/Modal";

interface Props {
    batch: Batch
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
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
                <tr className="table-info list-group d-print-none">
                    <Modal modal_id={`batchmod-${batch_id}`} setSelected={setSelected} isSelected={isSelected}
                           title={wine.fancy_name}>
                        <ul>
                            <li className={optionStyles}>
                                <Link onClick={() => setBatch(batch)} to={{pathname: "/winelog"}}>
                                    Complete Log
                                </Link>
                            </li>
                            <li className={optionStyles}>
                                <Link onClick={() => setBatch(batch)} to={{pathname: "/fermentation"}}>
                                    Fermenting
                                </Link>
                            </li>
                            <li className={optionStyles}>
                                <Link onClick={() => setBatch(batch)} to={{pathname: "/racking"}}>Racking</Link>
                            </li>
                            <li className={optionStyles}>
                                <Link onClick={() => setBatch(batch)} to={{pathname: "/filtering"}}>Filtering </Link>
                            </li>
                            <li className={optionStyles}>Output</li>
                        </ul>
                    </Modal>
                </tr>
            )}
        </>
    );
};