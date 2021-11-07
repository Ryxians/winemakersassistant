import React, {FC, useEffect, useState} from 'react';
import {Blended_Batch} from "@entities/Blended_Batch"
import {Batch} from "@entities/Batch"
import {Link} from "react-router-dom";

interface Props {
    blend: Blended_Batch
    setBatch:  React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
}

export const BlendListC: FC<Props> = ({blend, setBatch}) => {
    const {blend_id, wine, blending_date, blend_to_batch} = blend;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(blending_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()
    let button:HTMLButtonElement | null;
    const optionStyles = "list-group-item btn";

    useEffect(() => {
        if (isSelected) {
            button?.click();
        }
    })
    return (
        <>
            <tr onClick={() => {
                setSelected(!isSelected);
            }}>
                <th scope="row">{blend_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>?</td>
            </tr>
            {isSelected && (
                <tr className="d-print-none">
                    <td>
                        <div className="modal fade" id={`blendmod-${blend_id}`} data-bs-backdrop="static" data-bs-keyboard="false">
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
                                                <Link onClick={() => setBatch(blend)} to={{pathname: "/winelog"}} >
                                                    Complete Log
                                                </Link>
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
                        <button ref={h => button = h} className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#blendmod-${blend_id}`} />
                    </td>
                </tr>
            )}
        </>
    );
};