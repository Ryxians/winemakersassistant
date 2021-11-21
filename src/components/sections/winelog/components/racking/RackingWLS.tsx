import React, {FC, useEffect, useState} from 'react';
import Axios from "axios";
import {Racking} from '@entities/Racking';
import {Batch} from '@entities/Batch'
import {FermentWLC} from "../ferments/FermentWLC";
import {RackingWLC} from "./RackingWLC";
import {FermentationC} from "../../../continue/stage-components/FermentationC";
import {RackingC} from "../../../continue/stage-components/RackingC";

interface Props {
    batch: Batch
}

export const RackingWLS: FC<Props> = ({batch}) => {
    const [rackings, setRacking] = useState<Racking[]>();

    const getRacking = () => {
        Axios.get(`/wine/get/racking/${batch.batch_id}`).then(res => {
            let rack: Racking[] = res.data;

            rack.forEach(r => {
                r.date = new Date(r.date)
            })
            setRacking(rack);
        });
    }

    const racks = () => {
        let i = 0;
        if (rackings && rackings.length > 0) {
            const sorted = rackings.sort((a, b) => {
                return a.date.getTime() - b.date.getTime();
            })
            const list = sorted.map((rack) => {
                let rc = <RackingWLC key={i} number={i + 1} racking={rack}/>;
                i++;
                return rc;
            });

            return list;
        } else {
            return (
                <>
                    <h3>This Wine Hasn't Been Racked Yet.</h3>
                    <RackingC batch={batch} name={"Add Racking"}/>
                </>
            )
        }

    }

    useEffect(() => {
        getRacking();

    }, [])

    return (
        <>
            {rackings ? racks() : <h3>No Racking Section</h3>}
        </>
    );
};