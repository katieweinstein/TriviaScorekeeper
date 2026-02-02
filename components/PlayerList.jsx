import React from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { getPlayers } from '../api/players';
import DeletePlayerModal from './DeletePlayerModal';
import { styles, buttons, text } from './styles/styles';

export default function PlayerList({
  playersList,
  setPlayersList,
  playersInGame,
  setPlayersInGame,
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [playerToDelete, setPlayerToDelete] = React.useState('');

  React.useEffect(() => {
    getPlayers(setPlayersList);
    if (playersList.length) {
      playersList?.forEach((player) => {
        player.selected = false;
        player.wager = -1;
        player.submitted = false;
      });
    }
  }, []);

  // Add players to the list for the current game
  function selectPlayers(item) {
    if (item.selected) {
      item.selected = !item.selected;
      setPlayersInGame(playersInGame.filter((player) => player !== item));
    } else {
      if (playersInGame.length < 6) {
        item.selected = !item.selected;
        setPlayersInGame([...playersInGame, item]);
      } else {
        console.log('Too many players!');
      }
    }
  }

  // Item to be created for each element in the flat list - includes delete button
  const nameItem = (item) => (
    <View
      style={
        (styles.nameContainer,
          { backgroundColor: item.selected ? '#6961ad' : 'transparent' })
      }
    >
      <Pressable
        onPress={() => selectPlayers(item)}
        style={styles.nameContainer}
      >
        <Text style={text.playerList}>{item.name}</Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            setPlayerToDelete(item);
          }}
          style={buttons.deleteButton}
        >
          <Text style={{ color: 'white' }}>-</Text>
        </Pressable>
      </Pressable>
    </View>
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <DeletePlayerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        playerToDelete={playerToDelete}
        setPlayersList={setPlayersList}
      />
      <FlatList
        style={styles.flatList}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={playersList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => nameItem(item)}
      />
    </View>
  );
}
