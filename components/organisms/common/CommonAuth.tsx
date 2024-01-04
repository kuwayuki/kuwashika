import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextInputAtom from "../../atoms/TextInputAtom";
import { AppContextDispatch, AppContextState } from "../../../App";
import ModalAtom from "../../atoms/ModalAtom";
import IconAtom from "../../atoms/IconAtom";
export default function CommonAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appContextDispatch = React.useContext(AppContextDispatch);
  const appContextState = React.useContext(AppContextState);

  const auth = getAuth();
  const signIn = async (event: any) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    appContextDispatch.setUser(credential.user);
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(
      appContextState.currentPerson.patientNumber
    );
  };

  const cancel = () => {
    // Modalを閉じて、前の患者番号に戻す
    appContextDispatch.setModalNumber(0);
    appContextDispatch.setPatientNumber(
      appContextState.currentPerson.patientNumber
    );
  };

  const handleRegister = async (event: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // メール認証を行う
        sendEmailVerification(user)
          .then(() => {
            // 認証メール送信成功
            alert("メールを承認してください。");
          })
          .catch((error) => {
            // 認証メール送信エラー
            console.log(error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleResetPassword = async (event: any) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("パスワードリセットメールが送信されました。");
        alert("メールを確認してください。");
      })
      .catch((error) => {
        // エラー処理
        console.error("パスワードリセットメール送信エラー", error);
      });
  };

  return (
    <View
      style={{
        height: "100%",
        paddingTop: 16,
        paddingLeft: 16,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: "#EFFFF0",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 20, width: 250 }}>
          <TextInputAtom
            style={{
              width: "100%",
              borderWidth: 1,
              padding: 5,
              borderColor: "gray",
            }}
            autoComplete={"email"}
            autoFocus={true}
            onChangeText={setEmail}
            value={email}
            placeholder="メールアドレスを入力してください"
            placeholderTextColor={"gray"}
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
            placeholderTextColor={"gray"}
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
              backgroundColor: "gray",
              borderRadius: 10,
            }}
            onPress={cancel}
          >
            <Text style={{ color: "white" }}>キャンセル</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ color: "red", padding: 10 }}
          onPress={handleResetPassword}
        >
          パスワードを忘れた
        </Text>
      </View>
    </View>
  );
}
