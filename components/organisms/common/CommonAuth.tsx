import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import TextInputAtom from "../../atoms/TextInputAtom";
import ModalAtom from "../../atoms/ModalAtom";
import { AppContextDispatch } from "../../../App";
export default function CommonAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appContextDispatch = React.useContext(AppContextDispatch);

  const auth = getAuth();
  const signIn = async (event: any) => {
    console.log("signInAnonymously");
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        console.log("Signed");
        appContextDispatch.setModalNumber(1);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    // event.preventDefault();
    // // await signInWithEmailAndPassword(auth, email, password);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     alert(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    // const user = await signInAnonymously(auth);
  };
  const googleAuthenticate = (token) => {
    const provider = GoogleAuthProvider;
    // provider.addScopes("profile");
    // provider.addScopes("email");
    const credential = provider.credential(token);
    return signInWithCredential(auth, credential);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("Signed");
      // alert("サインインしました。");
      // ...
    } else {
      // User is signed out
      // ...
      // alert("logout");
    }
  });
  const logOut = async (event: any) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("サインアウトしました。");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleRegister = async (event: any) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View style={{ marginTop: 40, alignItems: "center" }}>
      <View style={{ marginBottom: 20, width: 250 }}>
        <TextInputAtom
          style={{
            width: "100%",
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
      <View style={{ marginBottom: 20, width: 250 }}>
        <TextInputAtom
          style={{
            width: "100%",
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
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
        <Text style={{ color: "blue", padding: 10 }} onPress={handleRegister}>
          登録する
        </Text>
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
      </View>
    </View>
  );
}
