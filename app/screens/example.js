import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import SwipeCards from 'react-native-swipe-cards';
import { uniqueId } from 'lodash';

import { getCards } from '../redux/actions';
import Cards from '../components/cards/Cards.js';
import NoCards from '../components/cards/NoCards.js';
import RoundButton from '../components/RoundButton';

import styles from '../../styles';

class Example extends React.Component {
  state = {
    id: ''
  };

  componentWillMount() {
    const id = uniqueId('prefix-');
    console.log('unique ID', id);
    this.setState({ id });
    this.props.getCards(this.props.user.geocode);
  }

  handleYup(card) {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/swipes`)
      .update({ [card.id]: true });
    this.checkMatch(card);
  }

  handleNope(card) {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/swipes`)
      .update({ [card.id]: false });
  }

  checkMatch(card) {
    firebase
      .database()
      .ref(`cards/${card.id}/swipes/${this.props.user.id}`)
      .once('value', snap => {
        if (snap.val() == true) {
          const me = {
            id: this.props.user.id,
            photoURL: this.props.user.images[0],
            name: this.props.user.name
          };
          const user = {
            id: card.id,
            photoURL: card.images[0],
            name: card.name
          };
          firebase
            .database()
            .ref(`cards/${this.props.user.id}/chats/${card.id}`)
            .set({ user });
          firebase
            .database()
            .ref(`cards/${card.id}/chats/${this.props.user.id}`)
            .set({ user: me });
        }
      });
  }

  render() {
    const id = this.state.id;
    return (
      <View style={[styles.container, { borderWidth: 1, borderColor: 'green' }]}>
        <LinearGradient colors={['#013cb2', '#ce89f9']} style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              backgroundColor: 'transparent'
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Near me</Text>
          </View>
          <SwipeCards
            key={`${id}`}
            cards={this.props.cards}
            stack
            loop
            renderCard={cardData => <Cards {...cardData} />}
            renderNoMoreCards={() => <NoCards />}
            showYup
            yupText="LIKE"
            showNope
            showMaybe
            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope.bind(this)}
            handleMaybe={this.handleMaybe}
            hasMaybeAction
            stackOffsetX={8}
            smoothTransition
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15
            }}
          >
            <RoundButton icon="restart" color={'white'} size={50} />
            <RoundButton
              icon="close"
              color={'white'}
              size={75}
              onPress={this.handleNope.bind(this)}
            />
            <RoundButton
              icon="heart-outline"
              color={'white'}
              size={75}
              onPress={this.handleYup.bind(this)}
            />
            <RoundButton icon="star-outline" color={'white'} size={50} />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.auth,
    loggedIn: state.auth.loggedIn,
    cards: state.auth.cards,
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  { getCards }
)(Example);
