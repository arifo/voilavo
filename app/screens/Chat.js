import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

import { sendNotification } from '../redux/actions';

class Chat extends Component {
  state = {
    messages: []
  };

  componentWillMount() {
    // firebase
    //   .database()
    //   .ref(`cards/${this.props.user.id}/chats/${this.props.navigation.state.params.user.id}`)
    //   .on('value', snap => {
    //     const items = [];
    //     snap.forEach(child => {
    //       if (child.val().key !== 'user') {
    //         const item = child.val();
    //         if (item.id !== firebase.auth().currentUser.uid) {
    //           items.push(item);
    //         }
    //       }
    //     });
    //     //  this.setState({ messages: items.reverse() });
    //   });
  }

  onSend(messages = []) {
    this.props.sendNotification(
      this.props.navigation.state.params.user.id,
      messages[0].user.name,
      messages[0].text
    );
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    for (let i = 0; i < messages.length; i++) {
      const { text, user, _id } = messages[i];

      const message = {
        _id,
        text,
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user
      };
      console.log('message', message, 'messagesssss', messages);

      firebase
        .database()
        .ref(`cards/${this.props.user.id}/chats/${this.props.navigation.state.params.user.id}`)
        .push(this.state.messages[0]);
      firebase
        .database()
        .ref(`cards/${this.props.navigation.state.params.user.id}/chats/${this.props.user.id}`)
        .push(this.state.messages[0]);
    }
  }

  render() {
    const { id, name, images } = this.props.user;

    // console.log('user ID', id, 'USER name', name, 'user PhotoURL', images[0]);
    console.log('state messages', this.state.messages);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderDay={day => console.log('day', day)}
        user={{
          _id: id,
          name,
          avatar: images[0]
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  { sendNotification }
)(Chat);
