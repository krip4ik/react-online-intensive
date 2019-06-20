// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Feed } from 'components/Feed';
import avatar from 'theme/assets/lisa.png';
import { Catcher } from 'components/Catcher';
import { Provider } from 'components/HOC/withProfile';


const options = {
    avatar,
    currentUserFirstName: 'Алина',
    currentUserLastName:  'Крипак',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
