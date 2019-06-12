import React, { Component } from 'react';
import { Consumer } from 'components/HOC/withProfile';
import { PropTypes } from 'prop-types';

//Instruments
import Styles from './styles.m.css';

export class Composer extends Component {
    constructor() {
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
    }

    state = {
        comment: '',
    }

    _updateComment(event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _submitComment(event) {
        event.preventDefault();
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);
        this.setState({
            comment: '',
        });
    }

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.composer }>
                            <img src = { context.avatar } />
                            <form onSubmit = { this._submitComment }>
                                <textarea
                                    placeholder = { `What's on your mind ${context.currentUserFirstName}?` }
                                    value = { comment }
                                    onChange = { this._updateComment }
                                />
                                <input
                                    type = 'submit'
                                    value = 'Post'
                                />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
Composer.propTypes = {
    _createPost: PropTypes.func.isRequired,
};
