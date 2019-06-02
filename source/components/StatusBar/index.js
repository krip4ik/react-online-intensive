import React from 'react';

import Styles from './styles.m.css';

export const StatusBar = (props) => {
    return (
        <section className = { Styles.statusBar }>
            <button>
                <img src = { props.avatar } />
                <span>{props.currentUserFirstName}</span>
                &nbsp;
                <span>{props.currentUserLastName}</span>
            </button>
        </section>
    );
};

