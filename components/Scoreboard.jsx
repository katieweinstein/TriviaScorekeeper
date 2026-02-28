import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text, colors } from './styles/styles';
import { addMoveToDB } from '../api/moves';
import Scoring from './Scoring';
import ExitGameModal from './ExitGameModal'

export default function Scoreboard({ route, navigation }) {
  const [gameInfo, setGameInfo] = React.useState({
    gameId: route.params.gameId,
    players: route.params.playersInGame,
  });
  const [moveInfo, setMoveInfo] = React.useState({
    player: '',
    score: 0,
  });
  const [scores, setScores] = React.useState(
    double ? [400, 800, 1200, 1600, 2000] : [200, 400, 600, 800, 1000]
  );
  const [double, setDouble] = React.useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = React.useState(false)

  const handleSubmit = () => {
    addMoveToDB(moveInfo.player.id, gameInfo.gameId, moveInfo.score);
    setMoveInfo({
      player: '',
      score: 0,
    });
    setScores(scores[0] < 0 ? scores.map((item) => item * -1) : scores);
  };

  // Button element with player name
  const playerButton = (item) => (
    <Pressable
      key={item.id}
      style={[
        buttons.playerButton,
        moveInfo.player === item
          ? { borderColor: 'white' }
          : { borderColor: colors.lightBlue },
      ]}
      onPress={() => {
        setMoveInfo({ ...moveInfo, player: item });
      }}
    >
      <Text style={text.buttonText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <ExitGameModal modalVisible={isExitModalVisible} setModalVisible={setIsExitModalVisible} navigation={navigation} />
      <View style={[styles.scoreboardButtonContainer, { marginTop: 15 }]}>
        {gameInfo.players.length ? (
          gameInfo.players.map((item) => playerButton(item))
        ) : (
            <Text styles={text.smallCentered}>Loading...</Text>
          )}
      </View>
      <Scoring
        scores={scores}
        setScores={setScores}
        double={double}
        setDouble={setDouble}
        moveInfo={moveInfo}
        setMoveInfo={setMoveInfo}
        gameInfo={gameInfo}
        setGameInfo={setGameInfo}
      />
      {/* Submit */}
      <Pressable
        style={[
          buttons.submitScore,
          typeof moveInfo.player === 'string' || moveInfo.score === 0
            ? { backgroundColor: 'grey', borderColor: 'grey' }
            : { backgroundColor: colors.darkGold },
        ]}
        onPress={handleSubmit}
      >
        <Text
          style={text.buttonText}
          disabled={typeof moveInfo.player === 'string' || moveInfo.score === 0}
        >
          Submit
        </Text>
      </Pressable>
      <View style={styles.buttonRowContainer}>
        {/* Game History */}
        <Pressable
          style={buttons.currentGameHistory}
          onPress={() =>
            navigation.navigate('CurrentGameHistory', {
              players: gameInfo.players,
              gameId: gameInfo.gameId,
            })
          }
        >
          <Text style={text.smallCentered}>Scores</Text>
        </Pressable>
        {/* Final Jeopardy */}
        <Pressable
          style={buttons.finalJeopardy}
          onPress={() =>
            navigation.navigate('FinalJeopardy', {
              players: gameInfo.players,
              gameId: gameInfo.gameId,
            })
          }
        >
          <Text style={text.smallCentered}>Final Wagers</Text>
        </Pressable>
      </View>
      <Pressable style={buttons.exitGame} onPress={() => setIsExitModalVisible(true)}>
        <Text style={text.smallCentered}>Exit Game</Text>
      </Pressable>
    </View>
  );
}
