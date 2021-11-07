import React, {FC, useEffect} from 'react';
import {Link} from "react-router-dom";

interface Props {
    modal_id: string
    setSelected: React.Dispatch<boolean>
    isSelected: boolean
    title: string
    children: JSX.Element
}

export const Modal: FC<Props> = ({modal_id, setSelected, isSelected, title, children}) => {
    let button: HTMLButtonElement | null;
    useEffect(() => {
        if (isSelected) {
            button?.click();
        }
    })

    return (
        <>
            <td>
                <div className="modal fade" id={modal_id} data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button onClick={() => setSelected(!isSelected)} type="button" className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setSelected(!isSelected)} type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="invisible">
                <button ref={h => button = h} className="btn btn-info" data-bs-toggle="modal"
                        data-bs-target={`#${modal_id}`}/>
            </td>
        </>
    );
};