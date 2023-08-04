import React from 'react';
import { Detector } from 'react-detect-offline';

import img from '../../assets/free-icon-no-wifi-7188169.png';
import './check-connection.css';

export const CheckConnection = (props) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div className="wrapper">
              <img className="image" src={img}></img>
              <h2 className="title">No connection</h2>
              <h5 className="description">Please check your internet connection</h5>
            </div>
          )
        }
      />
    </>
  );
};
