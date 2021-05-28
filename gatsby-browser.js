/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import Main from './src/layout/main';

export const wrapRootElement = ({ element }) => {
  return <Main>{element}</Main>;
};
