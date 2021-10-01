import React, {FC} from 'react';

interface Props {

}

export const RackingC : FC<Props> = () => {
 return (
  <div>
      <div className="input-group">
                <span className="input-group-text">
                    Racked SG
                </span>
          <input type="number"
                 className="form-control"/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Racked Temperature
                </span>
          <input type="number"
                 className="form-control"/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Sulfite
                </span>
          <input type="number"
                 className="form-control"/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Sorbate
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