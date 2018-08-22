import React from 'react';
import firebase from 'firebase';
import { View, StyleSheet } from 'react-native';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    const firebaseconfig = {
      apiKey: 'AIzaSyAfC2rHIamEaywrAtqVd5HuyAKpH-Q0egI',
      authDomain: 'authentication-c453b.firebaseapp.com',
      databaseURL: 'https://authentication-c453b.firebaseio.com',
      projectId: 'authentication-c453b',
      storageBucket: 'authentication-c453b.appspot.com',
      messagingSenderId: '337539059367'
    };

    firebase.initializeApp(firebaseconfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
}

  renderContent() {
    console.log(`LoggedIn in renderContent:${this.state.loggedIn}`);
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.logoutContainerStyle}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </View>);
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    console.log('we are in render');
    return (
      <View >
        <Header headerText='Login Screen' />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutContainerStyle: {
    borderBottomWidth: 1,
    padding: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
});
