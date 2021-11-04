import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import Axios from "axios";

interface Props {

}

interface Inputs {
    style:string
    name:string
}

export const NewKitC: FC<Props> = () => {
    // const [isBlended, setBlended] = useState(false);

    const {handleSubmit, register, setValue} = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async newKit => {
        console.log(newKit)
        Axios.post('/wine/add/kit', newKit);
        // await fetch(
        //     '/wine/add/kit',
        //     {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(newKit)
        //     }
        // );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">

            <h3>Add Kit</h3>

            <div className="input-group m-1 form-check form-check-inline">
                <span className="input-group-text">Kit Style: </span>
                <input type="text" className="form-control"
                       {...register("style", { required: true})}/>
                <input type="checkbox" className="form-check-input p-1 m-1" id="WineStyleCheck" onChange={() => {
                    setValue("style", "BLENDED");
                }}/>
                <label className="form-check-label" htmlFor="WineStyleCheck">Blended</label>
            </div>
            <div className="form-check">
            </div>
            <div className="input-group m-1">
                <span className="input-group-text">Fancy Name: </span>
                <input type="text" className="form-control" {...register("name", {required: true})}/>
            </div>
            <button type="submit" className="btn btn-primary m-1">Next</button>
        </form>
    );
};