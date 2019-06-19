import React, { Component } from 'react';
import { Consumer } from 'components/HOC/withProfile';
import { func, string, number, array } from 'prop-types';
//Instruments
import moment from 'moment';
import Like from '../Like/index';

import Styles from './styles.m.css';

export class Post extends Component {
    constructor() {
        super();

        this._onDeletePost = this._onDeletePost.bind(this);
    }

    _onDeletePost() {
        const { onDeletePost, id } = this.props;
        onDeletePost(id);
    }

    render() {
        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.post }>
                            <span
                                className = { Styles.cross }
                                onClick = { this._onDeletePost }
                            />
                            <img src = { context.avatar } />
                            <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                            <time>{moment.unix(this.props.created).format('MMMM D hh:mm:ss a')}</time>
                            <p>{ this.props.comment }</p>
                            <Like
                                _likePost = { this.props._likePost }
                                id = { this.props.id }
                                likes = { this.props.likes }
                                { ...context }
                            />
                        </section>
                    )
                }
            </Consumer>
        );
    }
}

Post.propTypes = {
    _likePost: func.isRequired,
    comment:   string.isRequired,
    created:   number.isRequired,
    id:        string.isRequired,
    likes:     array.isRequired,
};
