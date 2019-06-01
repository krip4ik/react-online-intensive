import React, { Component } from 'react';

import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';

import Styles from './styles.m.css';

class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <StatusBar/>
                <Composer />
                <Post/>
            </section>
        );
    }
}

export default Feed;
