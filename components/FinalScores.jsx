import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text } from './styles/styles';
import { getMovesForGame } from '../api/moves';

export default function FinalScores({ route, navigation }) {
  const gameId = route.params.gameId;
  const players = route.params.players;
  const reducer = (currentScore, move) => currentScore + move.score;

  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    getMovesForGame(setScores, gameId);
  }, []);

  return (
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <Text style={[text.mainText, { textDecorationLine: 'underline' }]}>
        Final Scores
      </Text>
      {players.map((player) => {
        const currentScore = scores.length
          ? scores
            .filter((score) => score.player_id === player.id)
            .reduce(reducer, 0)
          : 0;

        return (
          <View key={player.id}>
            <Text style={text.mainText}>
              {player.name}:{' '}
              <Text style={[text.score, { fontSize: 36 }]}>{currentScore}</Text>
            </Text>
          </View>
        );
      })}
      <Pressable
        style={buttons.home}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={text.buttonText}>Home</Text>
      </Pressable>
    </View>
  );
}
