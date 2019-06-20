import React, { Component } from 'react';

import { object } from 'prop-types';
import Styles from './styles.m.css';

export class Catcher extends Component {
    state = {
        error: false,
    }

    componentDidCatch (error, stack) {
        console.log('ERROR', error);
        console.log('STACKTRACE', stack);

        this.setState({
            error: true,
        });
    }


    render() {
        if (this.state.error) {
            return (
                <section className = { Styles.catcher }>
                    <span> An error occured</span>
                    <p>Working on it </p>
                </section>
            );
        }

        return this.props.children;
    }
}

Catcher.propTypes = {
    children: object.isRequired,
};

