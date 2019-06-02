import React from 'react';

//Instruments
import moment from 'moment';
import Styles from './styles.m.css';

export const Post = (props) => {
    return (
        <section className = { Styles.post }>
            <img src = { props.avatar } />
            <a>{ `${props.currentUserFirstName} ${props.currentUserLastName}` }</a>
            <time>{moment().format('MMMM D hh:mm:ss a')}</time>
            <p>Howdy!</p>
        </section>
    );
};

