import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {BatchListC} from "./listc/BatchListC";
import {BlendListC} from "./listc/BlendListC";
import Axios from "axios";
import 'bootstrap/js/dist/modal';

interface Props {
    setBatch:  React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
}

export const Continue: FC<Props> = ({setBatch}) => {
    const [wines, setWines] = useState<Batch[]>();
    const [blends, setBlends] = useState<Blended_Batch[]>();

    const getWines = () => {
        Axios.get('/wine/get/batchs/true').then(res => {
            res.status === 200 ? setWines(res.data) : setWines([])
        });

        Axios.get('/wine/get/blend/batchs/true').then(res => {
            res.status === 200 ? setBlends(res.data) : setBlends([]);
        });
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
    }, [])
    return (
        <div className="container">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Blend Id</th>
                    <th scope="col">Fancy Name</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Tank</th>
                </tr>
                </thead>
                <tbody>
                {
                    (blends && blends.length > 0) ?
                        (blends.map((wine) => <BlendListC key={wine.blend_id} blend={wine} setBatch={setBatch} />))
                        :
                        <tr><td>No wines</td></tr>
                }
                </tbody>

            </table>

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
                        <tr><td>No wines</td></tr>
                }
                </tbody>

            </table>

        </div>
    );
};