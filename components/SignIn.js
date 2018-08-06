import React from "react";
import { StyleSheet, Text, View, Button, navigation } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  KeyboardAvoidingView
} from "react-native-elements";

import { StackNavigator } from "react-navigation";
import db from "../firebase";
import styles from "./StyleSheet";
import PasswordInputText from "react-native-hide-show-password-input";
const firebase = require("firebase");
require("firebase/firestore");

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
      // user: {}
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  // componentDidMount() {
  //   this.redirect();
  // }

  handleSignUp() {
    const email = this.state.email;
    const password = this.state.password;
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.toString());
    }
  }

  handleLogIn(email, password) {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.toString());
    }
  }

  redirect() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.props.navigation.navigate("ClassroomId"); //Change
      } else {
        window.location = "SignIn";
      }
    });
  }

  render() {
    return (
      <View style={styles.signIn}>
        <FormLabel>School E-mail</FormLabel>
        <View style={{ width: 300 }}>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <FormLabel>Password</FormLabel>
        <View style={{ width: 300 }}>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
          />
        </View>
        {/* {this.renderError()} */}
        <Button
          onPress={() => {
            this.handleLogIn();
            // this.redirect();
            //this.props.navigation.navigate("ClassroomId");
          }}
          title="Log In FIRESTORE"
        />
        <Button
          onPress={() => {
            this.handleSignUp();
            this.props.navigation.navigate("ClassroomId");
          }}
          title="Sign Up FIRESTORE"
        />
        {/* <View>
          <Button
            onPress={() => this.props.navigation.navigate("ClassroomId")}
            title="Log In"
          />
        </View> */}
      </View>
    );
  }
}

export default SignIn;
