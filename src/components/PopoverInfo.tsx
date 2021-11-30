import React, {FC} from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";

interface Props {
    children: JSX.Element
    id: string
    header: string
    body: string | JSX.Element
}

export const PopoverInfo : FC<Props> = ({id,
                                            header,
                                            body,
                                            children}) => {

    // How the Popover will look
    const popover = (
        <Popover id={id}>
            <Popover.Header as="h3">
                {header}
            </Popover.Header>
            <Popover.Body>
                {body}
            </Popover.Body>
        </Popover>
    );
 return (
  <OverlayTrigger trigger={"focus"} placement={"bottom"} overlay={popover}>
      {children}
  </OverlayTrigger>
 );
};