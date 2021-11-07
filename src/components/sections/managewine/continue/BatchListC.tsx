import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Link} from "react-router-dom";

interface Props {
    batch: Batch
    setBatch:  React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
}

export const BatchListC: FC<Props> = ({batch, setBatch}) => {
    const {batch_id, wine, starting_tank, start_date} = batch;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(start_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()

    const optionStyles = "list-group-item btn";

    let button:HTMLButtonElement | null;
    useEffect(() => {
        if (isSelected) {
            button?.click();
        }
    })
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
                    <td>
                        <div className="modal fade" id={`blendmod-${batch_id}`} data-bs-backdrop="static" data-bs-keyboard="false">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Modal title</h5>
                                        <button onClick={() => setSelected(!isSelected)} type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <ul>
                                            <li className={optionStyles}>
                                                <Link onClick={() => setBatch(batch)} to={{pathname: "/winelog"}} >
                                                    Complete Log
                                                </Link>
                                            </li>
                                            <li className={optionStyles} >
                                                <Link onClick={() => setBatch(batch)} to={{pathname: "/fermentation"}}>
                                                    Fermenting
                                                </Link>
                                            </li>
                                            <li className={optionStyles}>
                                                <Link onClick={() => setBatch(batch)} to={{pathname: "/racking"}} >Racking</Link>
                                            </li>
                                            <li className={optionStyles}>
                                                <Link onClick={() => setBatch(batch)} to={{pathname: "/filtering"}}>Filtering </Link>
                                            </li>
                                            <li className={optionStyles}>Output</li>
                                        </ul>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={() => setSelected(!isSelected)} type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </td>
                    <td className="invisible">
                        <button ref={h => button = h} className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#blendmod-${batch_id}`} />
                    </td>
                </tr>
            )}
        </>
    );
};