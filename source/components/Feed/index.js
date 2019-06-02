import React, { Component } from 'react';

import * as Components from 'components';

import Styles from './styles.m.css';

export class Feed extends Component {
    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.feed }>
                <Components.StatusBar
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
                <Components.Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Components.Post
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
            </section>
        );
    }
}

