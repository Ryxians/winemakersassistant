import React, {FC, useState} from 'react';
import download from "downloadjs";
import Axios from "axios";
import {PopoverInfo} from "../../PopoverInfo";
import {Button, ButtonGroup, InputGroup} from "react-bootstrap";

interface Props {

}

export const DownloadWineSheet : FC<Props> = () => {
    let date = new Date();
    const onDownload = () => {
        let month = date.getUTCMonth();
        let year = date.getFullYear();
        Axios.get(`/wine/get/sheet/${month}&${year}`).then(res => {
            let data = res.data;
            let wb = data.wb ? data.wb : undefined;
            let name = data.name;

            if (wb && name) {
                download(wb, name);
            } else {
                console.log(wb, name);
            }
        });
    }
 return (
  <div>
      <PopoverInfo id={"downloadInfo"} header={"Excel Download"} body={"This downloads an Excel sheet!"} >
          <ButtonGroup className={"d-none d-lg-flex"}>
              <input type={"month"} className={"form-control"}
                     defaultValue={date.getFullYear() + "-" + (date.getUTCMonth() + 1)}
                     onChange={evt => {
                         let target = evt.target as HTMLInputElement;
                         let d = target.valueAsDate
                         if (d) {
                             date = d;
                         }
                     }}/>
              <Button variant={"warning"} onClick={onDownload}>Download</Button>
          </ButtonGroup>

      </PopoverInfo>
  </div>
 );
};