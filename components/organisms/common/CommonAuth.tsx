import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { app, auth } from "../../../App";
import TextInputAtom from "../../atoms/TextInputAtom";

export default function CommonAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (event: any) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user: UserCredential) => {
        console.log("ログイン成功=", user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logOut = async () => {
    await signOut(auth)
      .then(function (user) {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert(user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInputAtom
          style={{
            width: 250,
            borderWidth: 1,
            padding: 5,
            borderColor: "gray",
          }}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレスを入力してください"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextInputAtom
          style={{
            width: 250,
            borderWidth: 1,
            padding: 5,
            borderColor: "gray",
          }}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワードを入力してください"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#88cb7f",
          borderRadius: 10,
        }}
        onPress={signIn}
      >
        <Text style={{ color: "white" }}>サインイン</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#88cb7f",
          borderRadius: 10,
        }}
        onPress={logOut}
      >
        <Text style={{ color: "white" }}>ログアウト</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#88cb7f",
          borderRadius: 10,
        }}
        onPress={handleRegister}
      >
        <Text style={{ color: "white" }}>登録する</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
