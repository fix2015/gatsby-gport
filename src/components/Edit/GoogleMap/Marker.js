import React from 'react';
import Box from '@material-ui/core/Box';

export default function Marker ({ text }){
  return (<Box style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>{text}</Box>)
}
