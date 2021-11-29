import React, {FC} from 'react';

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

    // Whether the modal is being called within another Modal
    modalception?: undefined | boolean

    // Styling for the button
    className?: string

    // setSubmit binds the submit button to an object, allowing you to submit after code has been run
    setSubmit?: Function

    // A function to be called after the Modal is closed.
    onClick?: Function
}

export const ModalFB: FC<Props> = ({
                                       id,
                                       title,
                                       children,
                                       handleSubmit,
                                       onSubmit,
                                       modalception,
                                       className,
                                       setSubmit,
                                       onClick
                                   }) => {
    // If modalception isn't specified, assume false
    if (!modalception) {
        modalception = false;
    }

    // If no class is given, create one
    if (!className) {
        className = ""
    }
    className += " btn btn-primary";

    // Button used for closing modal
    let button: HTMLButtonElement | null;


    return (
        <>
            <div className="modal fade" id={`${id}`}>
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{title}: </h3>
                        </div>
                        <form className="container" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setSubmit ? setSubmit(button) : button?.click()}
                                        type="submit"
                                        className="btn btn-primary m-1">Add
                                </button>
                                {
                                    modalception ? (
                                            <>

                                                <button ref={b => button = b} type="button" className="invisible"
                                                        data-bs-target={`#${id}`}
                                                        data-bs-toggle="modal">Add
                                                </button>
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-target={`#${id}`}
                                                        data-bs-toggle="modal">Go Back
                                                </button>
                                            </>

                                        ) :
                                        (
                                            <>
                                                <button ref={b => button = b} type="button"
                                                        className="invisible" data-bs-dismiss="modal">Add
                                                </button>
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close
                                                </button>
                                            </>
                                        )
                                }

                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <button type="button" className={className}
                    data-bs-toggle="modal" data-bs-target={`#${id}`}
                    onClick={() => {
                        onClick && onClick();
                    }}
            >
                {title}
            </button>
        </>

    );
};