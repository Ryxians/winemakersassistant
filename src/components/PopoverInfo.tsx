import React, {FC} from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";

interface Props {
    children: JSX.Element
    id: string
    header: string
    body: string | JSX.Element
}

export const PopoverInfo : FC<Props> = ({id, header, body, children}) => {
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
  <OverlayTrigger trigger={"click"} placement={"right"} overlay={popover}>
      {children}
  </OverlayTrigger>
 );
};