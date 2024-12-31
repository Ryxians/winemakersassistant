import React, {FC} from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";
import {Placement} from "react-bootstrap/types";

interface Props {
    children: JSX.Element
    id: string
    header: string
    body: string | JSX.Element
    placement?: Placement
}

export const PopoverInfo : FC<Props> = ({id,
                                            header,
                                            body,
                                            placement,
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
  <OverlayTrigger trigger={"focus"} placement={placement ? placement : "bottom" } overlay={popover}>
      {children}
  </OverlayTrigger>
 );
};