import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import BusinessProfileEditor from './BusinessEditorProfile';
import { MenuApp } from '../../../..';


const BusinessEditor = () => {
  return (
    <Fragment>
      <MenuApp/>
      < BusinessProfileEditor />
    </Fragment>
  );
};
export default BusinessEditor;
