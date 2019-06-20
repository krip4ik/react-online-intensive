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

    _getCross = () => { 
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? <span
            className = { Styles.cross }
            onClick = { this._onDeletePost }
        /> : null;
    }

    render() {
        const { avatar, firstName, lastName, comment, created, _likePost, id, likes } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D hh:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
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
