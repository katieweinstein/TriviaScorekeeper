import React from 'react';
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { getPlayers, addPlayerToDB } from '../api/players';
import { styles, buttons, text } from './styles/styles';

export default function AddPlayersModal({
  modalVisible,
  setModalVisible,
  setPlayersList,
  setPlayersInGame,
}) {
  const [input, setInput] = React.useState('');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { height: '40%' }]}>
          <View style={styles.inputView}>
            <Text style={text.modalText}>New player's name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInput}
              value={input}
              autoCapitalize="words"
              maxLength={8}
              autoFocus
            />
          </View>
          <View style={styles.buttonRowContainer}>
            <Pressable
              style={buttons.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setInput('');
              }}
            >
              <Text style={text.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={buttons.modalButton}
              onPress={() => {
                if (input.length) {
                  addPlayerToDB(input);
                  getPlayers(setPlayersList);
                  setPlayersInGame([]);
                  setModalVisible(!modalVisible);
                  setInput('');
                }
              }}
            >
              <Text style={text.buttonText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal >
  );
}
