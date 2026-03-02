import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { getPlayers, deletePlayer } from '../api/players';
import { styles, buttons, text } from './styles/styles';

export default function DeletePlayerModal({
  modalVisible,
  setModalVisible,
  playerToDelete,
  setPlayersList,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={text.modalText}>
            Are you sure you would like to delete {playerToDelete.name}? This
            will permanently remove this player and their game history.
          </Text>
          <View style={styles.buttonRowContainer}>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={text.modalText}>No</Text>
            </Pressable>
            <Pressable
              style={buttons.smallModalButton}
              onPress={async () => {
                await deletePlayer(playerToDelete.id);
                await getPlayers(setPlayersList);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={text.modalText}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal >
  );
}
