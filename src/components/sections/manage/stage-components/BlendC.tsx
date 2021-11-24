import React, {FC} from 'react';
import {ModalFB} from "../../ModalFB";
import {useForm} from "react-hook-form";
import {Batch} from "@entities/Batch"
import {Blended_Batch} from "@entities/Blended_Batch"
import Axios from "axios";

interface Props {
    batch: Batch
    blends: Blended_Batch[]
}

interface Blending {
    blend_id: number
    batch_id: number
    gallons_used: number
}

export const BlendC: FC<Props> = ({batch, blends}) => {
    const {handleSubmit, register} = useForm<Blending>();

    const onSubmit = (blend:Blending) => {
        blend.batch_id = batch.batch_id;
        Axios.post('/wine/add/blend/to/batch/', blend)
            .then(res => {

            });

    }
    return (
        <ModalFB handleSubmit={handleSubmit}
                 onSubmit={onSubmit} title={"Blending"} id={`blending-${batch.batch_id}`}
                 modalception={true}>
            <>
                <h5 className="text-warning">This adds a wine to a Blended Batch, this does not create a blended batch.</h5>
                <div className="input-group">
                    <span className="input-group-text">
                        Active Blends:
                    </span>
                    <select className="form-select"
                            {...register("blend_id")}>
                        <option value={-1}>Choose a blend!</option>
                        {blends.map(({blend_id, wine}) => <option key={blend_id} value={blend_id}>{wine.fancy_name + ''}</option>)}
                    </select>
                </div>
                <div className="input-group">
                <span className="input-group-text">
                    Gallons Used:
                </span>
                    <input type="number"
                           className="form-control" {...register("gallons_used")}/>
                </div>
            </>
        </ModalFB>
    );
};