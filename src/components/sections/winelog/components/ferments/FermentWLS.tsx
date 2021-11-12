import React, {FC, useEffect, useState} from 'react';
import Axios from "axios";
import {FermentWLC} from "./FermentWLC";
import {Fermentation} from '@entities/Fermentation';
import {Batch} from '@entities/Batch'

interface Props {
    batch: Batch
}

export const FermentWlS: FC<Props> = ({batch}) => {
    const [fermentations, setFerment] = useState<Fermentation[]>();

    const getFermentation = () => {
        Axios.get(`/wine/get/fermentation/${batch.batch_id}`).then(res => {
            setFerment(res.data);
        });
    }

    const ferments = () => {
        let i = 0;
        if (fermentations) {
            const sorted = fermentations.sort((a, b) => {
                let aDate = new Date(a.date).getMilliseconds();
                let bDate = new Date(b.date).getMilliseconds();
                if (aDate > bDate) {
                    return 1;
                } else {
                    return -1;
                }
            })
            const list = sorted.map((ferm) => {
                let rc = <FermentWLC key={i} number={i+1} ferment={ferm} batch={batch}/>;
                i++;
                return rc;
            });
            return list;
        } else {
            return <td>No Fermentations</td>
        }

    }

    useEffect(() => {
        getFermentation();
    }, [])

    return (
        <div>
            <h3>Fermentation</h3>
            <table className="table table-striped table-bordered border-dark">
                <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>SG</th>
                    <th>Temperature</th>
                    <th>Notes</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {fermentations && ferments()}
                </tbody>
            </table>
        </div>
    );
};