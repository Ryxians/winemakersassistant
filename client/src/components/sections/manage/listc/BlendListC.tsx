import React, {FC, useState} from 'react';
import {Blended_Batch} from "@entities/Blended_Batch"
import {Batch} from "@entities/Batch"
import {Link} from "react-router-dom";
import {OutputC} from "../stage-components/OutputC";
import {User} from '@entities/User'
import {Button, Modal} from "react-bootstrap";

interface Props {
    blend: Blended_Batch
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
    user: User
}

export const BlendListC: FC<Props> = ({blend, setBatch, user}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    let {blend_id, wine, date} = blend;
    date = new Date(date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()
    return (
        <>
            <tr>
                <th scope="row">{blend_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>{blend.tank}</td>
                <td className={"d-print-none"}>
                    <Button variant={"primary"} onClick={handleOpen}>Edit</Button>
                    <Modal show={show}
                           onHide={handleClose} centered
                           fullscreen={"md-down"}
                           >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {wine.fancy_name}: {blend_id}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="btn-group-vertical">
                                <Link className="btn btn-primary" onClick={() => {
                                    setBatch(blend);
                                }} to={{pathname: "/winelog"}}>
                                    Complete Log
                                </Link>
                                <OutputC batch={blend} user={user} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"secondary"} onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        </>
    );
};