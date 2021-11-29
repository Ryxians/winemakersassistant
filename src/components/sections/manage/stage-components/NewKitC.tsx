import React, {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";
import {PopoverInfo} from "../../../PopoverInfo";
import {InputRequiredAlert} from "../../InputRequiredAlert";

interface Props {
    setWine?: Function
}

interface Inputs {
    wine_style: string
    fancy_name: string
    kit_volume: number
}

export const NewKitC: FC<Props> = ({setWine}) => {
    // const [isBlended, setBlended] = useState(false);
    const [submitButton, setSubmit] = useState<HTMLButtonElement>()

    const {handleSubmit, register, setValue, formState: {errors}} = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async newKit => {
        Axios.post('/wine/add/kit', newKit).then ( res => {
            setWine && setWine(res.data.wine_id);
            if (res.status === 201) {
                submitButton?.click();
            }
        });
    }

    const newStyleBody =
        <>
            <p>
            Enter the official Kit Style.
            </p>
            <p>
            The style can be found on the side of the box
            and on the provided sticker.
            </p>
            <span className={"text-warning"}>Blended wines will always have a style of BLENDED.</span>
        </>

    return (
        <ModalFB handleSubmit={handleSubmit}
                 onSubmit={onSubmit}
                 title={"New Kit"}
                 id={"CreateNewKitModal"}
                 modalception={true}
                 setSubmit={setSubmit}
        >
            <>

                <div className="input-group m-1 form-check form-check-inline">
                    <span className="input-group-text">Kit Style: </span>
                    <PopoverInfo id={"NewStyleInformation"} header={"Kit Style"}
                                 body={newStyleBody}>

                        <input type="text" className="form-control"
                               {...register("wine_style", {required: true})}/>
                    </PopoverInfo>
                    <input type="checkbox" className="form-check-input p-1 m-1" id="WineStyleCheck" onChange={() => {
                        setValue("wine_style", "BLENDED");
                    }}/>
                    <label className="form-check-label" htmlFor="WineStyleCheck">Blended</label>
                </div>
                {errors.wine_style && <InputRequiredAlert>No Style Given</InputRequiredAlert>}
                <div className="form-check">
                </div>
                <div className="input-group m-1">
                    <span className="input-group-text">Fancy Name: </span>
                    <PopoverInfo id={"FancyNameInformation"} header={"Fancy Name"}
                                 body={"This is the name used on the custom label."} >

                        <input type="text" className="form-control" {...register("fancy_name", {required: true})}/>
                    </PopoverInfo>
                </div>
                {errors.fancy_name && <InputRequiredAlert>No Fancy Name Given</InputRequiredAlert>}
                <div className="input-group m-1">
                    <span className="input-group-text">Kit Volume: </span>
                    <PopoverInfo id={"NewKitVolumeInfo"} header={"Kit Volume"}
                                 body={"Kit Volume can be found on the box the kit came in."}>

                        <input type="number"
                               className="form-control"
                               {...register("kit_volume", {required: true})}
                        />
                    </PopoverInfo>
                    <span className="input-group-text">
                        Liters
                    </span>
                </div>
                {errors.kit_volume && <InputRequiredAlert>No Kit Volume Provided</InputRequiredAlert>}
            </>
        </ModalFB>
    );
};