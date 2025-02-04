import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { MonoText } from "../../moleculars/StyledText";
import { Text, View } from "../common/Themed";
import { useState } from "react";
import { i18n } from "../../locales/i18n";

export default function EditScreenInfo({ path }: { path: string }) {
  const [text, onChangeText] = useState("Useless Text");
  const inputAccessoryViewID = "uniqueID";
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <TextInput
          placeholder={i18n.t("edit_screen_info.input_placeholder")}
          placeholderTextColor="hsla(210, 10%, 10%, 0.3)"
          value={text}
          multiline={true}
          style={styles.textBox}
          onChangeText={onChangeText}
          keyboardType={"phone-pad"}
          inputAccessoryViewID={inputAccessoryViewID}
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Open up the code for this screen:
        </Text>
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <MonoText>{path}</MonoText>
        </View>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  textBox: {
    width: "95%",
    height: 130,
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 5,
    marginTop: 15,
    fontSize: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
