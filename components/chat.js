import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import fireDb from './fireDb';


class chat extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    get user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: fireDb.shared.uid,
        };
    }

    render(){
        return (
             <GiftedChat
                messages={this.state.messages}
                onSend={fireDb.shared.send}
                user={this.user}
            />
        );
    }


    componentDidMount() {
        fireDb.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    componentWillUnmount() {
        fireDb.shared.off();
    }
}


export default chat;