import React from 'react';

//Instruments
import avatar from 'theme/assets/lisa.png';
import moment from 'moment';
import Styles from './styles.m.css';

const Composer = () => {
    return (
        <section className = { Styles.post }>
            <img src = { avatar } />
            <a>Lisa Simpson</a>
            <time>{moment().format('MMMM D hh:mm:ss a')}</time>
            <p>Howdy!</p>
        </section>
    );
};

export default Composer;
