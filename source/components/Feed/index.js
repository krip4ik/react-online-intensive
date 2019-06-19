/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withProfile } from 'components/HOC/withProfile';

import * as Components from 'components';
import { getUniqueID, delay } from '../../instruments/index';
import moment from 'moment';
import { Spinner } from '../Spinner/Spinner';
import Styles from './styles.m.css';

@withProfile
export class Feed extends Component {
    state = {
        posts: [
            { id: 'wedwefdwsc', created: 1560310675, comment: 'Hey there!', likes: [] },
            { id: 'wedwefdwscsdc', created: 1560310676, comment: 'Whats app, man', likes: [] },
        ],
        isPostsFetching: false,
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostsFetching: state,
        });
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    }

     _likePost = async (id) => {
         const { currentUserFirstName, currentUserLastName } = this.props;

         this._setPostsFetchingState(true);

         await delay(1200);

         const newPosts = this.state.posts.map((post) => {
             if (post.id === id) {
                 return {
                     ...post,
                     likes: [
                         {
                             id:        getUniqueID(),
                             firstName: currentUserFirstName,
                             lastName:  currentUserLastName,
                         },
                     ],
                 };
             }

             return post;
         });

         this.setState({
             posts:           newPosts,
             isPostsFetching: false,
         });
     }

    _onDeletePostHandler = async (id) => {
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.filter((item) => item.id !== id);

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Components.Post
                    _likePost = { this._likePost }
                    key = { post.id }
                    onDeletePost = { this._onDeletePostHandler }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <Components.StatusBar />
                <Components.Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}

