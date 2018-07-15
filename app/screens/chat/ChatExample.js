import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { sendNotification } from '../../redux/actions';

class ChatExample extends Component {
  state = {
    messages: []
  };

  componentWillMount() {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/chats/${this.props.navigation.state.params.user.id}`)
      .on('value', snap => {
        const items = [];
        snap.forEach(child => {
          if (child.key !== 'user') {
            const item = child.val();
            if (item.id !== firebase.auth().currentUser.uid) {
              items.push(item);
            }
          }
          console.log('items', items);
        });
        this.setState({ messages: items.reverse() });
      });
  }

  loadMessages(callback) {
    const messagesRef = firebase
      .database()
      .ref(`cards/${this.props.user.id}/chats/${this.props.navigation.state.params.user.id}`);
    //messagesRef.off();
    const onRecieve = data => {
      const message = data.val();
      callback[
        {
          _id: data.key,
          text: message.text,
          createdAt: new Date(message.createdAt),
          user: {
            _id: this.props.user.id,
            name: this.props.name
          }
        }
      ];
    };
    messagesRef.limitToLast(20).on('child_added', onRecieve);
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
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/chats/${this.props.navigation.state.params.user.id}`)
      .push({
        _id: messages[0]._id,
        text: messages[0].text,
        user: messages[0].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    firebase
      .database()
      .ref(`cards/${this.props.navigation.state.params.user.id}/chats/${this.props.user.id}`)
      .push({
        _id: messages[0]._id,
        text: messages[0].text,
        user: messages[0].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
  }

  render() {
    console.log('messages', this.state.messages);
    const { id, name, images } = this.props.user;

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: id,
          name,
          avatar: images[0]
        }}
        showAvatarForEveryMessage
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
)(ChatExample);
