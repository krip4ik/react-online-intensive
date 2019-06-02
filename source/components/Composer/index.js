import React from 'react';

//Instruments
import Styles from './styles.m.css';

export const Composer = (props) => {
    return (
        <section className = { Styles.composer }>
            <img src = { props.avatar } />
            <form>
                <textarea placeholder = { `What's on your mind ${props.currentUserFirstName}?` } />
                <input
                    type = 'submit'
                    value = 'Post'
                />
            </form>
        </section>
    );
};
