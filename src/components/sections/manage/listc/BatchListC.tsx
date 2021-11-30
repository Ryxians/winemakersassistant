import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Link} from "react-router-dom";
import {ModalT} from "../modal/ModalT";
import {FermentationC} from "../stage-components/FermentationC";
import {RackingC} from "../stage-components/RackingC";
import {FilteringC} from "../stage-components/FilteringC";
import {BlendListC} from "./BlendListC";
import {BlendC} from "../stage-components/BlendC";
import {OutputC} from "../stage-components/OutputC";
import {User} from '@entities/User'

interface Props {
    batch: Batch
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
    blends?: Blended_Batch[]
    user: User
}

export const BatchListC: FC<Props> = ({batch, setBatch, blends, user}) => {
    const {batch_id, wine, starting_tank, start_date} = batch;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(start_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()

    const [button, getButton] = useState<HTMLButtonElement>()

    const optionStyles = "list-group-item btn";
    const modalId = `batchmod-${batch_id}`

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
                    <ModalT modal_id={modalId} setSelected={setSelected} isSelected={isSelected}
                            title={wine.fancy_name}
                            getButton={getButton}
                    >
                        <div className="btn-group-vertical btn-group-lg">
                            <Link className="btn btn-primary" onClick={() => {
                                setBatch(batch)
                                button?.click();
                            }} to={{pathname: "/winelog"}}>
                                    Complete Log
                            </Link>
                            <FermentationC batch={batch}/>
                            <RackingC batch={batch} />
                            <FilteringC batch={batch} />
                            {blends && (

                            <BlendC batch={batch} blends={blends} />
                            )}
                            <OutputC batch={batch} user={user} />
                        </div>
                    </ModalT>
                </tr>
            )}
        </>
    );
};