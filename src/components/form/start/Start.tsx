import React, {FC} from 'react';

interface Props {

}

export const Start: FC<Props> = () => {
    return (
        <form className='container'>
            <h2 className='text-center'>Create New Wine</h2>
            <div className="input-group">
                <span className="input-group-text">Current Date & Time</span>
                <input type="datetime-local" className="form-control"/>
            </div>
        </form>
    );
};