import React from 'react';
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import moment from 'moment';
import Styles from './styles.m.css';

export const Post = () => {
    return (
        <Consumer>
            {
                (context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                        <time>{moment().format('MMMM D hh:mm:ss a')}</time>
                        <p>Howdy!</p>
                    </section>
                )
            }
        </Consumer>
    );
};

