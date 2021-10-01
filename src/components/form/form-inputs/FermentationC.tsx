import React, {FC} from 'react';

interface Props {

}

export const FermentationC : FC<Props> = () => {
 return (
  <div>
      <div className="input-group">
                <span className="input-group-text">
                    New SG Level
                </span>
          <input type="number"
                 className="form-control"/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Current Temperature
                </span>
          <input type="number"
                 className="form-control"/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Notes
                </span>
          <input type="text"
                 className="form-control"/>
      </div>
  </div>
 );
};