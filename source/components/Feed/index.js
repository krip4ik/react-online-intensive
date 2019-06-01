import React from 'react';

import * as Components from 'components';

import Styles from './styles.m.css';

export const Feed = () => {
    return (
        <section className = { Styles.feed }>
            <Components.StatusBar />
            <Components.Composer />
            <Components.Post />
        </section>
    );
};
