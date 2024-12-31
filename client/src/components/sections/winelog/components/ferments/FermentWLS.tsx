import React, {FC, useEffect, useState} from 'react';
import Axios from "axios";
import {FermentWLC} from "./FermentWLC";
import {Fermentation} from '@entities/Fermentation';
import {Batch} from '@entities/Batch'
import {FermentationC} from "../../../manage/stage-components/FermentationC";

interface Props {
    batch: Batch
}

export const FermentWlS: FC<Props> = ({batch}) => {

    // Stores an array of Fermentation objects
    const [fermentations, setFerment] = useState<Fermentation[]>();

    // Grabs fermentations from batch
    const getFermentation = () => {
        Axios.get(`/wine/get/fermentation/${batch.batch_id}`).then(res => {
            let ferm:Fermentation[] = res.data;

            ferm.forEach(f => {
                // The date object is a little broken, to fully utilize it
                // Reinitialize it
                f.date = new Date(f.date)
            })
            setFerment(ferm);
        });
    }

    // Sorts the ferments and creates individual rows for the table
    const ferments = () => {
        let i = 0;
        if (fermentations) {
            const sorted = fermentations.sort((a, b) => {
                return a.date.getTime() - b.date.getTime();
            })
            return sorted.map((ferm) => {
                let rc = <FermentWLC key={i} number={i+1} ferment={ferm} batch={batch}/>;
                i++;
                return rc;
            });
        } else {
            return <td>No Fermentations</td>
        }

    }

    // Grab fermentations on first load.
    useEffect(() => {
        getFermentation();
    },[])

    return (
        <div>
            <h3>Fermentation</h3>
            <FermentationC batch={batch} name={"Add Fermentation"} className={"d-print-none m-1"} />
            <table className="table table-sm table-striped table-bordered border-dark">
                <thead>
                <tr>
                    <th> </th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>SG</th>
                    <th>Temperature</th>
                    <th>Notes</th>
                    <th className="d-print-none">Edit</th>
                </tr>
                </thead>
                <tbody>
                {fermentations && ferments()}
                </tbody>
            </table>
        </div>
    );
};