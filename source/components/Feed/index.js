import React, { Component } from 'react';

import * as Components from 'components';
import { getUniqueID } from '../../instruments/index';
import moment from 'moment';
import Styles from './styles.m.css';

export class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts: [
            {id: 'wedwefdwsc', created: 1560310675, comment: 'Hey there!'},
            {},
        ],
    }

    _createPost(comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
        };
        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
    }

    render() {
        const { posts } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Components.Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Components.StatusBar />
                <Components.Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}

