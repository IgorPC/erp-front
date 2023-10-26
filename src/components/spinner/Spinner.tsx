import React from 'react';
import SpinnerProps from './SpinnerProps';
import CircularProgress from '@mui/material/CircularProgress';

import "./Spinner.css"

const Spinner: React.FC<SpinnerProps> = ({width, height}) => {
  let heightSize = '40px'
  let widthSize = '40px'

  if (width) {
    widthSize = width
  }
  if (height) {
    heightSize = height
  }


  return (
    <div className='div-spinner-container'>
      <CircularProgress style={{width: widthSize, height: heightSize}}/>
    </div>
  );
}

export default Spinner