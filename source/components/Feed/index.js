/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

import { withProfile } from 'components/HOC/withProfile';

import * as Components from 'components';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

import { Spinner } from '../Spinner';
import Postman from '../Postman/';

import Styles from './styles.m.css';


@withProfile
export class Feed extends Component {
    state = {
        posts:           [],
        isPostsFetching: false,
    }

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${meta.authorFirstName} ${meta.authorLastName}` !== `${currentUserFirstName} ${currentUserLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });


        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${meta.authorFirstName} ${meta.authorLastName}` !== `${currentUserFirstName} ${currentUserLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((item) => item.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${meta.authorFirstName} ${meta.authorLastName}` !== `${currentUserFirstName} ${currentUserLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostsFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostsFetching: false,
        });
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);
        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    }

     _likePost = async (id) => {
         this._setPostsFetchingState(true);

         const response = await fetch(`${api}/${id}`, {
             method:  'PUT',
             headers: {
                 Authorization: TOKEN,
             },
         });

         const { data: likedPost } = await response.json();

         this.setState(({posts}) => ({
             posts:           posts.map((post) => post.id === likedPost.id ? likedPost : post),
             isPostsFetching: false,
         }));
     }

    _onDeletePostHandler = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({posts}) => ({
            posts:           posts.filter((item) => item.id !== id),
            isPostsFetching: false,
        }));
    }

    _animateComposerEnter = (composer) => {
        fromTo(composer, 1, { opacity: 0}, { opacity: 1});
    };

    _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { opacity: 0, x: 350}, { opacity: 1, x: 0});
    };

    _animatePostmanEntered = (postman) => {
        fromTo(postman, 1, { opacity: 1, x: 0}, { opacity: 0, x: -350});
    };

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Components.Catcher>
                    <Components.Post
                        _likePost = { this._likePost }
                        key = { post.id }
                        onDeletePost = { this._onDeletePostHandler }
                        { ...post }
                    />
                </Components.Catcher>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <Components.StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 1000 } //how long we are being on phase entering
                    onEnter = { this._animateComposerEnter }>
                    <Components.Composer _createPost = { this._createPost } />
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 4000 }
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanEntered } >
                    <Postman />
                </Transition>
                {postsJSX}
            </section>
        );
    }
}

