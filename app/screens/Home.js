import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getCards } from '../redux/actions';
import SwipeCards from 'react-native-swipe-cards';
import Cards from '../components/cards/Cards.js';
import NoCards from '../components/cards/NoCards.js';

import styles from '../../styles';

class Home extends React.Component {
  componentWillMount() {
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
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={cardData => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}
      />
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
)(Home);
