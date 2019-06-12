import React from 'react';
import { createPortal } from 'react-dom';

const portal = document.getElementById('spinner');

import Styles from './styles.m.css';

export const Spinner = ({ isSpinning }) => {
    return createPortal(
        isSpinning ? <div className = { Styles.spinner } /> : null,
        portal,
    );
};
