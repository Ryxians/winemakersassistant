import React, {FC} from 'react';
import {ModalFB} from "../../ModalFB";
import {useForm} from "react-hook-form";
import { Batch } from "@entities/Batch"

interface Props {
    batch: Batch
}
interface Blending {

}

export const BlendC: FC<Props> = ({batch}) => {
    const {handleSubmit, register} = useForm<Blending>();

    const onSubmit = () => {

    }
    return (
        <ModalFB handleSubmit={handleSubmit} onSubmit={onSubmit} title={"Blending"} id={`blending-${batch}`}>
            <></>
        </ModalFB>
    );
};