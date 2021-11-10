import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";

interface Props {
    setWine: Function
}

interface Inputs {
    style: string
    name: string
}

export const NewKitC: FC<Props> = ({setWine}) => {
    // const [isBlended, setBlended] = useState(false);

    const {handleSubmit, register, setValue} = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async newKit => {
        console.log(newKit)
        Axios.post('/wine/add/kit', newKit).then ( res => {
            setWine(res.data.wine_id);
        });
    }

    return (
        <ModalFB handleSubmit={handleSubmit} onSubmit={onSubmit} title={"New Kit"} id={"CreateNewKitModal"} modalception={true}>
            <>

                <div className="input-group m-1 form-check form-check-inline">
                    <span className="input-group-text">Kit Style: </span>
                    <input type="text" className="form-control"
                           {...register("style", {required: true})}/>
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
            </>
        </ModalFB>
    );
};