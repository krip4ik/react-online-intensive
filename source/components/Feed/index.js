import React, { Component } from 'react';

import * as Components from 'components';

import Styles from './styles.m.css';

export class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <Components.StatusBar/>
                <Components.Composer/>
                <Components.Post/>
            </section>
        );
    }
}

