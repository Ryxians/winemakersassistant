import React, {FC, useState} from 'react';
import {Toast} from "react-bootstrap";
import wineglass from "./login/glass-with-wine.svg";


interface Props {
    message:string
}

export const BackendToast : FC<Props> = ({message}) => {
    // Whether the toast is visible
    const [show, setShow] = useState(true);

 return (
     <Toast onClose={() => setShow(false)} show={show} delay={4800} autohide>
         <Toast.Header>
             <img className="mb-4" src={wineglass} alt="" width="42" height="27"/>
             <strong className="me-auto">Wine Maker's Assistant</strong>
         </Toast.Header>
         <Toast.Body>
             {message}
         </Toast.Body>
     </Toast>
 );
};