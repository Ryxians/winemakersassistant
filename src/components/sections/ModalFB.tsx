import React, {FC} from 'react';

interface Props {
    children: JSX.Element
    handleSubmit: any
    onSubmit: Function
    id: string
    title: string
    modalception?: undefined | boolean
    className?: string
    notFormChildren?: JSX.Element,
    setSubmit?: Function
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
                                       notFormChildren,
                                       setSubmit,
                                       onClick
                                   }) => {
    if (!modalception) {
        modalception = false;
    }

    if (!className) {
        className = ""
    }
    className += " btn btn-primary";

    let button: HTMLButtonElement | null;


    return (
        <>
            <div className="modal fade" id={`${id}`}>
                <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{title}: </h3>
                            {notFormChildren}
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