import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Link} from "react-router-dom";
import {ModalT} from "../modal/ModalT";
import {FermentationC} from "../stage-components/FermentationC";
import {RackingC} from "../stage-components/RackingC";
import {FilteringC} from "../stage-components/FilteringC";
import {BlendC} from "../stage-components/BlendC";
import {OutputC} from "../stage-components/OutputC";
import {User} from '@entities/User'
import {Button, Modal} from "react-bootstrap";

interface Props {
    batch: Batch
    setBatch: React.Dispatch<React.SetStateAction<Batch | Blended_Batch | undefined>>
    blends?: Blended_Batch[]
    user: User
}

export const BatchListC: FC<Props> = ({batch, setBatch, blends, user}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const {batch_id, wine, tank, start_date} = batch;
    const [isSelected, setSelected] = useState(false);
    let date = new Date(start_date);
    let newDate = "" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()

    const [button, getButton] = useState<HTMLButtonElement>()

    const optionStyles = "list-group-item btn";
    const modalId = `batchmod-${batch_id}`

    return (
        <>
            <tr>
                <th scope="row">{batch_id}</th>
                <td>{wine.fancy_name}</td>
                <td>{newDate}</td>
                <td>{tank}</td>
                <td className={"d-print-none"}>
                    <Button variant={"primary"} onClick={handleOpen}>Edit</Button>
                    <Modal show={show}
                           onHide={handleClose} centered
                           fullscreen={"md-down"}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {wine.fancy_name}: {batch_id}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="btn-group-vertical btn-group-lg">
                                <Link className="btn btn-primary" onClick={() => {
                                    setBatch(batch)
                                    button?.click();
                                }} to={{pathname: "/winelog"}}>
                                    Complete Log
                                </Link>
                                <FermentationC batch={batch}/>
                                <RackingC batch={batch} />
                                <FilteringC batch={batch} />
                                {blends && (

                                    <BlendC batch={batch} blends={blends} />
                                )}
                                <OutputC batch={batch} user={user} />
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