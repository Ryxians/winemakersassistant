import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@server/database/entities/Batch'
import {BatchListC} from "../BatchListC";
import {set} from "react-hook-form";

interface Props {
    setBatch:  React.Dispatch<React.SetStateAction<Batch | undefined>>
}

export const Continue: FC<Props> = ({setBatch}) => {
    const [wines, setWines] = useState<Batch[]>();

    const getWines = () => {
        fetch('/wine/get/batchs/true',
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(async res => {
            console.log("Status: " + res.status);
            if (res.status === 200) {
                const rWines: Batch[] = await res.json();
                setWines(rWines);
            } else {
                setWines([]);
            }
        })
    }

    useEffect(() => {
        try {
            if (!wines) {
                getWines()
            } else {

            }
        } catch (e) {
            // Haha error :o
        }
    })
    return (
        <div className="container">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Batch Id</th>
                    <th scope="col">Fancy Name</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Tank</th>
                </tr>
                </thead>
                <tbody>
                {
                    (wines && wines.length > 0) ?
                        (wines.map((wine) => <BatchListC key={wine.batch_id} batch={wine} setBatch={setBatch}/>))
                        :
                        <p>No wines</p>
                }
                </tbody>

            </table>

        </div>
    );
};