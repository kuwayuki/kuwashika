import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppContextDispatch, AppContextState } from "../../../App";
import TextInputAtom from "../../atoms/TextInputAtom";
import * as FileSystem from "expo-file-system";
import { AUTH_FILE } from "../../../constants/Constant";
import { getFileData } from "../../../constants/Util";
import { i18n } from "../../locales/i18n";

export default function CommonAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appContextDispatch = useContext(AppContextDispatch);
  const appContextState = useContext(AppContextState);

  const auth = getAuth();
  const signIn = async (event: any) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (credential) => {
        appContextDispatch.setUser(credential.user);
        appContextDispatch.setModalNumber(0);
        appContextDispatch.setPatientNumber(
          appContextState.currentPerson.patientNumber
        );
        writeFileData({ email, password });

        for (const person of appContextState.settingData.persons) {
          console.log(person);
          try {
            const readData = await getFileData(person.patientNumber);
            if (readData) {
              appContextDispatch.saveDB(
                readData,
                person.patientNumber,
                credential.user,
                true
              );
            }
          } catch (error) {}
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
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
            alert(i18n.t("auth.email_verification_sent"));
            writeFileData({ email, password });
            appContextDispatch.setUser(user);
            appContextDispatch.setModalNumber(0);
            appContextDispatch.setPatientNumber(
              appContextState.currentPerson.patientNumber
            );
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
        alert(i18n.t("auth.password_reset_sent"));
      })
      .catch((error) => {
        // エラー処理
      });
  };

  const writeFileData = async (data: any) => {
    const fileUri = FileSystem.documentDirectory + AUTH_FILE;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
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
            placeholder={i18n.t("auth.email_placeholder")}
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
            placeholder={i18n.t("auth.password_placeholder")}
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
            <Text style={{ color: "white" }}>{i18n.t("settings.sign_in")}</Text>
          </TouchableOpacity>
          <Text style={{ color: "blue", padding: 10 }} onPress={handleRegister}>
            {i18n.t("auth.register")}
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "gray",
              borderRadius: 10,
            }}
            onPress={cancel}
          >
            <Text style={{ color: "white" }}>{i18n.t("common.cancel")}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ color: "red", padding: 10 }}
          onPress={handleResetPassword}
        >
          {i18n.t("auth.forgot_password")}
        </Text>
      </View>
    </View>
  );
}
