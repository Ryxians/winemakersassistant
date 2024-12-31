import React, {FC} from 'react';

interface Props {

}

export const InputRequiredAlert: FC<Props> = ({children}) => {
    return (
        <span className="alert alert-danger p-1 m-1" role="alert">
            {children}
        </span>
    );
};