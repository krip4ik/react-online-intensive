import React, { Component } from 'react';
import { func, string, number, array } from 'prop-types';
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import moment from 'moment';
import Like from '../Like/index';

import Styles from './styles.m.css';

@withProfile
export class Post extends Component {
    _onDeletePost = () => {
        const { onDeletePost, id } = this.props;
        onDeletePost(id);
    }

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span
                    className = { Styles.cross }
                    onClick = { this._onDeletePost }
                />
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment.unix(this.props.created).format('MMMM D hh:mm:ss a')}</time>
                <p>{this.props.comment}</p>
                <Like
                    _likePost = { this.props._likePost }
                    id = { this.props.id }
                    likes = { this.props.likes }
                />
            </section>
        );
    }
}

Post.propTypes = {
    _likePost: func.isRequired,
    comment: string.isRequired,
    created: number.isRequired,
    id: string.isRequired,
    likes: array.isRequired,
};
