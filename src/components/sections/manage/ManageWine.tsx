import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {BatchListC} from "./listc/BatchListC";
import {BlendListC} from "./listc/BlendListC";
import Axios from "axios";
import 'bootstrap/js/dist/modal';
import {NewBatchC} from "./stage-components/NewBatchC";
import {NewKitC} from "./stage-components/NewKitC";
import {BlendedBatchC} from "./stage-components/BlendedBatchC";
import {DownloadWineSheet} from "./DownloadWineSheet";
import {User} from '@entities/User'

interface Props {
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
    user?: User
}

export const ManageWine: FC<Props> = ({setBatch, user}) => {
    const [wines, setWines] = useState<Batch[]>();
    const [blends, setBlends] = useState<Blended_Batch[]>();
    const [active, setActive] = useState(true);

    const getWines = async () => {
        let activeStr = active ? 'true' : 'false'
        let res = await Axios.get('/wine/get/batchs/' + activeStr);

        res.status === 200 ? setWines(res.data) : setWines([])

        res = await Axios.get('/wine/get/blend/batchs/' + activeStr)
        res.status === 200 ? setBlends(res.data) : setBlends([]);
    }

    useEffect(() => {
        try {
            if (!wines) {
                getWines().then();
            } else {

            }
        } catch (e) {
            // Haha error :o
        }
    }, [])
    return (
        <div className="container">
            <div className="btn-toolbar p-3 d-print-none">
                <div className="btn-group btn-group-sm p-1">
                    <NewKitC/>
                    {<NewBatchC/>}

                </div>
                {/*<div className="btn-group btn-group-sm p-1">*/}
                {/*    {wines && <BlendedBatchC/>}*/}
                {/*</div>*/}
                <DownloadWineSheet />
                <div className="btn-group btn-group-sm p-1">
                    <button className="btn btn-secondary" onClick={(evt) => {
                        let btn = evt.currentTarget as HTMLButtonElement;
                        btn.disabled = true;
                        setActive(!active);
                        getWines().then(() => btn.disabled = false);
                    }}>
                        Toggle Active
                    </button>
                    <button className="btn btn-primary"
                            onClick={() => getWines().then()}
                    >Refresh</button>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Blend Id</th>
                    <th scope="col">Fancy Name</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Tank</th>
                    <th scope="col" className={"d-print-none"}>Edit</th>
                </tr>
                </thead>
                <tbody>
                {
                    (blends && blends.length > 0 && user) ?
                        (blends.map((wine) => <BlendListC key={wine.blend_id} blend={wine} setBatch={setBatch} user={user}/>))
                        :
                        <tr>
                            <td>No wines</td>
                        </tr>
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
                    <th scope="col" className={"d-print-none"}>Edit</th>
                </tr>
                </thead>
                <tbody>
                {
                    (wines && wines.length > 0 && user) ?
                        (wines.map((wine) => <BatchListC key={wine.batch_id} batch={wine} setBatch={setBatch}
                                                         blends={blends}
                                                         user={user}
                        />))
                        :
                        <tr>
                            <td>No wines</td>
                        </tr>
                }
                </tbody>

            </table>

        </div>
    );
};