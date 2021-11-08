import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {Interface} from "readline";

interface Props {
    children: JSX.Element
    handleSubmit: any
    onSubmit: Function
    id: string
    title: string
}

export const ModalFB : FC<Props> = ({id, title, children, handleSubmit, onSubmit}) => {
    return (
     <>
         <div className="modal fade" id={`${id}`}>
             <div className="modal-dialog modal-fullscreen-md-down">
                 <div className="modal-content">
                     <div className="modal-header">
                         <h3 className="modal-title">{title}: </h3>
                     </div>
                     <form className="container" onSubmit={handleSubmit(onSubmit)}>
                         <div className="modal-body">
                             {children}
                         </div>
                         <div className="modal-footer">
                             <button type="submit" className="btn btn-primary m-1" data-bs-dismiss="modal">Add
                             </button>
                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                             </button>
                         </div>
                     </form>

                 </div>
             </div>
         </div>
         <button type="button" className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target={`#${id}`}>
             {title}
         </button>
     </>

 );
};