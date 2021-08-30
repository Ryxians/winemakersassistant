import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

interface Props {

}

type Inputs = {
    datetime: Date
}

export const Start: FC<Props> = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async start => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='container'>
            <h2 className='text-center'>Create New Wine</h2>
            <div className="input-group">
                <span className="input-group-text">Current Date & Time</span>
                <input type="datetime-local"
                       className="form-control"
                       {...register("datetime", {required: true})}/>
            </div>
        </form>
    );
};