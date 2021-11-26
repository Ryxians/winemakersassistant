import React, {FC} from 'react';
import download from "downloadjs";
import Axios from "axios";
import {PopoverInfo} from "../../PopoverInfo";

interface Props {

}

export const DownloadWineSheet : FC<Props> = () => {
    const onDownload = () => {
        Axios.get('/wine/get/sheet').then(res => {
            let data = res.data;
            let wb = data.wb;
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

          <button className="btn btn-primary btn-outline-warning"
                  onClick={onDownload}
          >Download!</button>
      </PopoverInfo>
  </div>
 );
};