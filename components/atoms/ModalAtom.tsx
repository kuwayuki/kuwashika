import React, { useState } from "react";
import { Modal, ModalProps, StyleSheet, View } from "react-native";

export default function ModalAtom(props: ModalProps) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        supportedOrientations={["portrait", "landscape"]}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>{props.children}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
