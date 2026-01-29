import React from 'react';
import { Text, View, Pressable } from 'react-native';
import AddPlayersModal from './AddPlayersModal';
import PlayerList from './PlayerList';
import { styles, buttons, text } from './styles/styles';
import { addGameToDB } from '../api/games';

export default function AddPlayers({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [playersList, setPlayersList] = React.useState([]);
  const [playersInGame, setPlayersInGame] = React.useState([]);

  async function addGame() {
    console.log("***")
    const data = await addGameToDB(playersInGame);
    console.log("******")
    return data.gameId;
  }

  return (
    <View style={styles.container}>
      <AddPlayersModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPlayersList={setPlayersList}
        setPlayersInGame={setPlayersInGame}
      />
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={text.mainText}>Players</Text>
        <PlayerList
          playersList={playersList}
          setPlayersList={setPlayersList}
          playersInGame={playersInGame}
          setPlayersInGame={setPlayersInGame}
        />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={buttons.addPlayerButton}
        >
          <Text style={text.buttonText}>Add New Player</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            const id = await addGame();
            navigation.navigate('Scoreboard', {
              playersInGame: playersInGame,
              gameId: id,
            });
          }}
          // onPress={() =>
          //   navigation.navigate('Scoreboard', { playersInGame: playersInGame })
          // }
          style={
            playersInGame.length ? buttons.nextButton : buttons.disabledButton
          }
          disabled={!playersInGame.length}
        >
          <Text style={text.buttonText}>Start Game</Text>
        </Pressable>
      </View>
    </View>
  );
}
