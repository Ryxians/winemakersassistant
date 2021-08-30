import React, {FC} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";

interface Props {

}

type Inputs = {
    datetime: Date,
    password: string
}

export const NewKit: FC<Props> = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async start => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='container'>
            <h2 className="text-center">Add New Kit</h2>
            <div className="input-group">
                <span className="input-group-text">Kit Name: </span>
                <input type="text" className="form-control"/>
            </div>
            <div className="input-group">
                <span className="input-group-text"></span>
                <input type="text" className="form-control"/>
            </div>
        </form>
    );
};