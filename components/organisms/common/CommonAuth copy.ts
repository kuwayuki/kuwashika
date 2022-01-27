import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK5BZLDENQgHazvA4v_vkif2RAMRr2ygI",
  authDomain: "perio-c5aa7.firebaseapp.com",
  projectId: "perio-c5aa7",
  storageBucket: "perio-c5aa7.appspot.com",
  messagingSenderId: "922948003582",
  appId: "1:922948003582:web:6ab4106b75fb589bc767af",
  measurementId: "G-95YCTDCXLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: "",
    });
  }

  onLoginFail() {
    this.setState({
      loading: false,
      error: "Authentication Failed",
    });
  }

  loadSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <TouchableOpacity
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}
      >
        <Text>新規登録 or ログイン</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
            placeholder="user@gmail.com"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <View style={styles.wrap}>
          <TextInput
            secureTextEntry
            placeholder="password"
            autoCorrect={false}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <View style={styles.wrap}>{this.loadSpinner()}</View>
      </View>
    );
  }
}

const styles = {
  // スタイルを記述
};

export default LoginForm;
