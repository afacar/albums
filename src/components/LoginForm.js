import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, StyleSheet } from 'react-native';
import { Button, Card, CardItem, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed!',
            loading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Input
                        placeholder="user@gmail.com" 
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardItem>
                <CardItem>
                    <Input 
                        // we can omit {true}, since by default it is considered as true
                        secureTextEntry        
                        placeholder="password"
                        value={this.state.password}
                        label="Password"
                        onChangeText={password => this.setState({ password })}
                    />
                </CardItem>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardItem>
                    {this.renderButton()}
                </CardItem>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

export default LoginForm;
