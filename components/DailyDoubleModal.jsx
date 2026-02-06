import React from 'react';
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { styles, buttons, text } from './styles/styles';
import { addMoveToDB } from '../api/moves';

export default function DailyDoubleModal({
  dailyDoubleScore,
  moveInfo,
  setMoveInfo,
  gameInfo,
  modalVisible,
  setModalVisible,
  double,
}) {
  const [input, setInput] = React.useState('');

  function handlePress(multiplier) {
    if (input < dailyDoubleScore && input > 4) {
      addMoveToDB(moveInfo.player.id, gameInfo.gameId, input * multiplier);
      setModalVisible(!modalVisible);
      setInput('');
    }
  }

  function determineMaximumWager() {
    if (double && dailyDoubleScore <= 2000) {
      return 2000;
    } else if (double && dailyDoubleScore > 2000) {
      return dailyDoubleScore;
    } else if (!double && dailyDoubleScore <= 1000) {
      return 1000;
    } else if (!double && dailyDoubleScore > 1000) {
      return dailyDoubleScore;
    }
  }

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
        <View style={styles.modalView}>
          <View style={styles.inputView}>
            <Text style={text.modalText}>{moveInfo.player.name}'s wager:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInput}
              value={input}
              maxLength={6}
              keyboardType="number-pad"
            />
            <View style={{ marginBottom: 30 }}>
              <Text style={text.score}>
                Max wager: ${determineMaximumWager()}
              </Text>
              <Text style={text.score}>Min wager: $5</Text>
            </View>
          </View>
          <View style={styles.buttonRowContainer}>
            <Pressable
              style={[buttons.wager, { backgroundColor: input ? 'red' : 'gray' }]}
              onPress={() => handlePress(-1)}
              disabled={!input}
            >
              <Text style={text.smallCentered}>${input * -1}</Text>
            </Pressable>
            <Pressable
              style={[buttons.wager, { backgroundColor: input ? 'green' : 'gray' }]}
              onPress={() => handlePress(1)}
              disabled={!input}
            >
              <Text style={text.smallCentered}>${input || 0}</Text>
            </Pressable>
          </View>
          <View style={styles.scoreboardButtonContainer}>
            <Pressable
              style={buttons.smallModalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setInput('');
                setMoveInfo({ ...moveInfo, score: 0 });
              }}
            >
              <Text style={text.smallCentered}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
