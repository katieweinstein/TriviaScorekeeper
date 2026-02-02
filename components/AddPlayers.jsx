import React from 'react';
import { Text, View, Pressable } from 'react-native';
import AddPlayersModal from './AddPlayersModal';
import PlayerList from './PlayerList';
import { styles, buttons, text, colors } from './styles/styles';
import { addGameToDB } from '../api/games';

export default function AddPlayers({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [playersList, setPlayersList] = React.useState([]);
  const [playersInGame, setPlayersInGame] = React.useState([]);

  async function addGame() {
    const data = await addGameToDB(playersInGame);
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
          <Text style={text.smallCentered}>+ Add New Player</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            const id = await addGame();
            navigation.navigate('Scoreboard', {
              playersInGame: playersInGame,
              gameId: id,
            });
          }}
          style={[buttons.startGameButton, {
            backgroundColor: playersInGame.length ? colors.darkGold : colors.buttonDisabledBackground, borderColor: playersInGame.length ? colors.lightGold : colors.buttonDisabledBorder
          }]}
          disabled={!playersInGame.length}
        >
          <Text style={text.buttonText}>Start Game</Text>
        </Pressable>
        <Text style={[text.smallCentered, { marginBottom: 10 }]}>
          {playersInGame.length} player{playersInGame.length !== 1 && 's'}{' '}
        selected.
      </Text>
        <Text style={text.smallCentered}>Max 6 players per game.</Text>
      </View>
    </View >
  );
}
