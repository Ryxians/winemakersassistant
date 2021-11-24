import React, {FC, useEffect, useState} from 'react';
import {ModalFB} from "../../ModalFB";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {Wine} from "@entities/Wine"
import {Batch} from '@entities/Batch'
// import {Blended_Batch} from '@entities/Blended_Batch'

interface Props {
}

interface Blended_Batch {
    wine_id: number
    date: Date
}

export const BlendedBatchC : FC<Props> = () => {
    const {handleSubmit, register, setValue} = useForm<Blended_Batch>();

    interface wine {
        wine_id: number
        fancy_name: string
        wine_style: string
    }

    const [wines, setWines] = useState<wine[]>([]);

    const getWines = async (wine_id?: number) => {
        Axios.get('/wine/get/kit').then(res => {
            if (res.status === 200) {
                let wines = res.data;
                wines = wines.filter((w:Wine) => {
                    if (w.wine_style === "BLENDED") {
                        return w;
                    }
                });
                setWines(wines);
                wine_id && setValue("wine_id", wine_id);
            } else {
                setWines([
                    {
                        wine_id: 0,
                        wine_style: "ERROR",
                        fancy_name: "ERROR"
                    }
                ]);
            }
        });
    }

    useEffect(() => {
        getWines().then()
    }, [])


    const onSubmit = (blend:Blended_Batch) => {
        Axios.post('wine/add/blend/batch/', blend)
            .then(res => {

            });
    }
 return (
  <ModalFB handleSubmit={handleSubmit}
  onSubmit={onSubmit}
  title={"New Blended Batch"}
  id={'create-new-blendedBatch'}>
      <>
          <div className="input-group">
              <span className="input-group-text">Select Wine (Kit)</span>
              <select defaultValue={-1} className="form-select"
                      {...register("wine_id")}>
                  <option value={-1}>Choose a wine!</option>
                  {wines.map(({wine_id, fancy_name}) =>
                      (<option value={wine_id} key={wine_id}> {fancy_name} </option>)
                  )}
              </select>
          </div>
      </>
  </ModalFB>
 );
};