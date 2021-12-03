import React, {FC, useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";

interface Props {
    children: JSX.Element
    // Runs when the form is submitted
    handleSubmit: any

    // Called by handleSubmit
    onSubmit: Function

    // Identifier of the Modal
    id: string

    // What the button and Modal Header displays
    title: string

    // Close function from outside
    setClose?: any

    //Class Name
    className?: string

    // A function to be called after the Modal is closed.
    onClick?: Function
}

export const ModalFB: FC<Props> = ({
                                       id,
                                       title,
                                       children,
                                       handleSubmit,
                                       onSubmit,
                                       onClick,
                                       setClose,
                                       className
                                   }) => {
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        onClick && onClick();
    }

    useEffect(() => {
        setClose && setClose(handleClose)
    }, [])


    return (
        <>
            <Modal show={show}
                   onHide={handleClose} centered
                   size={"lg"}
                   fullscreen={"md-down"}
                   className={className}
            >
                <Modal.Header>
                    <Modal.Title>{title}: </Modal.Title>
                </Modal.Header>
                <form className={"container"} onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={"submit"}>Add</Button>
                        <Button onClick={handleClose}>Return</Button>
                    </Modal.Footer>
                </form>

            </Modal>

            <Button onClick={handleOpen}>{title}</Button>
        </>

    );
};