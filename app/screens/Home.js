import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import { getCards } from '../redux/actions';
import Cards from '../components/cards/Cards.js';
import RoundButton from '../components/RoundButton';
import Header from '../components/Header';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    };
  }
  componentWillMount() {
    this.props.getCards(this.props.user.geocode);
  }
  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack
      },
      cb
    );
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };
  swipeRight = () => {
    this.swiper.swipeRight();
  };
  swipeTop = () => {
    this.swiper.swipeTop();
  };

  handleYup(card) {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/swipes`)
      .update({ [this.props.cards[card].id]: true });
    this.checkMatch(card);
  }

  handleNope(card) {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/swipes`)
      .update({ [this.props.cards[card].id]: false });
  }

  checkMatch(card) {
    firebase
      .database()
      .ref(`cards/${this.props.cards[card].id}/swipes/${this.props.user.id}`)
      .once('value', snap => {
        if (snap.val() === true) {
          const me = {
            id: this.props.user.id,
            photoURL: this.props.user.images[0],
            name: this.props.user.name
          };
          const user = {
            id: this.props.cards[card].id,
            photoURL: this.props.cards[card].images[0],
            name: this.props.cards[card].name
          };
          firebase
            .database()
            .ref(`cards/${this.props.user.id}/chats/${this.props.cards[card].id}`)
            .set({ user });
          firebase
            .database()
            .ref(`cards/${this.props.cards[card].id}/chats/${this.props.user.id}`)
            .set({ user: me });
        }
      });
  }

  render() {
    return (
      <Swiper
        ref={swiper => {
          this.swiper = swiper;
        }}
        cards={this.props.cards}
        cardIndex={this.state.cardIndex}
        renderCard={cardData => <Cards {...cardData} />}
        infinite
        onSwiped={this.onSwiped}
        onSwipedLeft={this.handleNope.bind(this)}
        onSwipedRight={this.handleYup.bind(this)}
        onSwipedAll={this.onSwipedAllCards}
        onTapCard={tap => console.log('tap', tap)}
        cardVerticalMargin={80}
        stackSize={3}
        stackSeparation={0}
        overlayLabels={labelstyle}
        animateOverlayLabelsOpacity
        animateCardOpacity
        cardStyle={{
          width: deviceWidth * 0.9,
          height: deviceHeight * 0.65,
          borderRadius: 8
        }}
        cardVerticalMargin={50}
      >
        <View style={styles.container}>
          <LinearGradient colors={['#013cb2', '#ce89f9']} style={styles.container}>
            <Header text="Near me" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15
              }}
            >
              <RoundButton icon="restart" color={'white'} size={50} onPress={this.swipeBack} />
              <RoundButton icon="close" color={'white'} size={75} onPress={this.swipeLeft} />
              <RoundButton
                icon="heart-outline"
                color={'white'}
                size={75}
                onPress={this.swipeRight}
              />
              <RoundButton icon="star-outline" color={'white'} size={50} onPress={this.swipeTop} />
            </View>
          </LinearGradient>
        </View>
      </Swiper>
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

const labelstyle = {
  bottom: {
    title: 'BLEAH',
    style: {
      label: {
        backgroundColor: '#9262C2',
        borderColor: '#9262C2',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  left: {
    title: 'NOPE',
    style: {
      label: {
        backgroundColor: '#FF6C6C',
        borderColor: '#FF6C6C',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: -30
      }
    }
  },
  right: {
    title: 'LIKE',
    style: {
      label: {
        backgroundColor: '#4CCC93',
        borderColor: '#4CCC93',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30
      }
    }
  },
  top: {
    title: 'SUPER LIKE',
    style: {
      label: {
        backgroundColor: '#4EB8B7',
        borderColor: '#4EB8B7',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
});
