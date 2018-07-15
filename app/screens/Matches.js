import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo';

import Header from '../components/Header';

const deviceWidth = Dimensions.get('window').width;

const TEMP_LAST_MESSAGE = 'Last message ...';
const TEMP_LAST_TIME = '20:13';
const TEMP_UNREAD_MESSAGES = 3;

class Matches extends Component {
  state = {
    chats: []
  };

  componentWillMount() {
    firebase
      .database()
      .ref(`cards/${this.props.user.id}/chats`)
      .on('value', snap => {
        const items = [];
        snap.forEach(child => {
          const item = child.val();
          items.push(item);
        });
        this.setState({ chats: items.reverse() });
      });
  }

  render() {
    // console.log('chats', this.state.chats);
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#013cb2', '#ce89f9']} style={styles.container}>
          <Header text="I was liked by ..." />
          {/* <View style={{ borderWidth: 1, borderColor: 'white' }}>
            <Text>I was liked by ...</Text>
          </View> */}
          <ScrollView style={{ padding: 5, backgroundColor: '#F0F0F0' }}>
            {this.state.chats.map((uri, index) => (
              <TouchableOpacity
                style={styles.imgRow}
                key={index}
                activeOpacity={0.9}
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    user: uri.user,
                    title: uri.user.name
                  })
                }
              >
                <View>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30
                    }}
                    source={{ uri: uri.user.photoURL }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 12,
                    height: 60
                  }}
                >
                  <View style={{ paddingVertical: 5, justifyContent: 'space-between' }}>
                    <Text style={{ color: '#110f0f', fontWeight: '500', fontSize: 14 }}>
                      {uri.user.name}
                    </Text>
                    <Text style={{ color: '#7c7b7b', fontSize: 12, fontStyle: 'italic' }}>
                      {TEMP_LAST_MESSAGE}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingVertical: 5,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingRight: 5
                    }}
                  >
                    <Text style={{ color: '#7c7b7b', fontSize: 10, paddingTop: 5 }}>
                      {TEMP_LAST_TIME}
                    </Text>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: '#df4723',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text style={{ color: '#ffffff', fontSize: 14 }}>{TEMP_UNREAD_MESSAGES}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Matches);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa7a7',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 5
    //justifyContent: 'center'
  }
});
