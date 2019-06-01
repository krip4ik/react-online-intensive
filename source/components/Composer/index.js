import React from 'react';

//Instruments
import avatar from '../../theme/assets/lisa.png';
import Styles from './styles.m.css';

export const Composer = () => {
    return (
        <section className = { Styles.composer }>
            <img src = { avatar } />
            <form>
                <textarea placeholder = { 'What\'s on your mind Lisa?' } />
                <input
                    type = 'submit'
                    value = 'Post'
                />
            </form>
        </section>
    );
};
