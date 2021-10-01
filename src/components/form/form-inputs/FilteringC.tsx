import React, {FC} from 'react';

interface Props {

}

export const FilteringC : FC<Props> = () => {
 return (
  <div>
      <div className="input-group">
                <span className="input-group-text">
                    Filtered SG
                </span>
          <input type="number"
                 className="form-control"/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    New Tank
                </span>
          <input type="text"
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