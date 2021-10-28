import React, {FC, useEffect, useState} from 'react';
import { Wine } from '@server/database/entities/Wine'
import {Redirect} from "react-router-dom";
interface Props {
    wine: Wine
}

export const WineLog : FC<Props> = ({wine}) => {


 return (
  <div className="container">
      {!wine && (<Redirect to={'/'} />)}
      <h3>Wine Log: {wine.fancy_name}</h3>
      {/*Batch Information*/}


      {/*Filtering Updates*/}

      {/*Racking*/}

      {/*Filtering*/}

      {/*Output*/}

  </div>
 );
};