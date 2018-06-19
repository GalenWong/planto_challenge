import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import List from './List';
import { Provider , connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    console.log(store);
    return (
      <Provider store={store}>
      <View style={styles.container} >
      <List />
      </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
