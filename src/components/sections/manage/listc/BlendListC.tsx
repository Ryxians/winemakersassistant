import React, {FC, useEffect, useState} from 'react';
import {Blended_Batch} from "@entities/Blended_Batch"
import {Batch} from "@entities/Batch"
import {Link} from "react-router-dom";
import {ModalT} from "../modal/ModalT";
import {FermentationC} from "../stage-components/FermentationC";
import {RackingC} from "../stage-components/RackingC";
import {FilteringC} from "../stage-components/FilteringC";
import {OutputC} from "../stage-components/OutputC";
import {User} from '@entities/User'

interface Props {
    blend: Blended_Batch
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
    user: User
}

export const BlendListC: FC<Props> = ({blend, setBatch, user}) => {
    let {blend_id, wine, date, blend_to_batch} = blend;
    const [isSelected, setSelected] = useState(false);
    date = new Date(date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()
    const optionStyles = "list-group-item btn";

    const [button, getButton] = useState<HTMLButtonElement>()

    const id = `blendmod-${blend_id}`
    return (
        <>
            <tr onClick={() => {
                setSelected(!isSelected);
            }}>
                <th scope="row">{blend_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>{blend.tank}</td>
            </tr>
            {isSelected && (
                <tr className="d-print-none">
                    <ModalT modal_id={id} setSelected={setSelected} isSelected={isSelected} title={wine.fancy_name}
                            getButton={getButton}
                    >
                        <div className="btn-group-vertical">
                            <Link className="btn btn-primary" onClick={() => {
                                setBatch(blend);
                                button?.click();
                            }} to={{pathname: "/winelog"}}>
                                Complete Log
                            </Link>
                            <OutputC batch={blend} user={user} />
                        </div>
                    </ModalT>
                </tr>
            )}
        </>
    );
};