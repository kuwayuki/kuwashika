import React, { useState } from "react";
import { Modal, ModalProps, StyleSheet, View } from "react-native";

type ModalAtomProps = { isSetting?: boolean } & ModalProps;
export default function ModalAtom(props: ModalAtomProps) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        animationType={"slide"}
        supportedOrientations={["portrait", "landscape"]}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={
            props.isSetting
              ? [styles.modalViewCenter, styles.modalView]
              : [styles.modalViewCenter]
          }
        >
          {props.children}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    flex: 1,
  },
  modalViewCenter: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    paddingTop: 30,
  },
  modalView: {
    paddingTop: 30,
    paddingLeft: 100,
    paddingRight: 100,
    alignItems: undefined,
  },
});
