import React, {FC} from 'react';
import {NewBatchC} from "./manage/stage-components/NewBatchC";

interface Props {

}

export const GeneralForm: FC<Props> = () => {
    // const {register ,handleSubmit, watch} = useForm();
    return (
        <div className="container text-center g-5">
            <h1>Wine Log</h1>
            {/*<NewKitC />*/}

            <h2>Phase Two: New Batch</h2>
            <NewBatchC />

            <h2>Phase 3: Fermentation Updates</h2>
            {/*<FermentationC />*/}

            <h2>Phase Four: Racking</h2>
            {/*<RackingC />*/}

            <h2>Phase Five: Filtering</h2>
            {/*<FilteringC />*/}

            <h2>Completion: Bottle or Kegging</h2>
            {/*<OutputC />*/}
        </div>
    );
};