import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Link} from "react-router-dom";
import {ModalT} from "../modal/ModalT";
import {FermentationC} from "../stage-components/FermentationC";
import {RackingC} from "../stage-components/RackingC";
import {FilteringC} from "../stage-components/FilteringC";

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
                            title={wine.fancy_name}>
                        <div className="btn-group-vertical">
                            <Link className="btn btn-primary" onClick={() => setBatch(batch)} to={{pathname: "/winelog"}}>
                                    Complete Log
                            </Link>
                            <FermentationC batch={batch}/>
                            <RackingC batch={batch} />
                            <FilteringC batch={batch} />
                            Output
                        </div>
                    </ModalT>
                </tr>
            )}
        </>
    );
};