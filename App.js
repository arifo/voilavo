import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './app/redux/reducers';

import Login from './app/screens/Login';

const middlewares = [thunk];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <Login />
        </Provider>
      </View>
    );
  }
}
