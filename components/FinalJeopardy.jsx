import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles, buttons, text, colors } from './styles/styles';
import { addMoveToDB, getMovesForGame } from '../api/moves';

export default function FinalJeopardy({ route, navigation }) {
  const gameId = route.params.gameId;
  const players = route.params.players;
  const reducer = (currentScore, move) => currentScore + move.score;

  const [input, setInput] = React.useState(players);
  const [scores, setScores] = React.useState([]);

  function handleChange(index, value) {
    setInput([...input, (input[index].wager = value)]);
  }

  function handleSubmit(index, playerId, multiplier) {
    addMoveToDB(playerId, gameId, input[index].wager * multiplier);
    setInput([...input, (input[index].submitted = true)]);
  }

  React.useEffect(() => {
    getMovesForGame(setScores, gameId);
  }, []);

  const wagerInput = (player, index) => {
    const currentScore = scores.length
      ? scores
        .filter((score) => score.player_id === player.id)
        .reduce(reducer, 0)
      : 0;

    const canSubmitWager = input[index].wager <= currentScore && input[index].wager !== ''

    const renderWagerPressable = (isCorrect) => (
      <Pressable
        style={[
          buttons.wager,
          canSubmitWager
            ? { backgroundColor: isCorrect ? 'green' : 'red' }
            : { backgroundColor: 'grey' },
        ]}
        onPress={() => handleSubmit(index, player.id, -1)}
      >
        <Text style={text.smallCentered}>{isCorrect ? 'Correct' : 'Incorrect'}</Text>
      </Pressable>
    )

    return (
      <View style={{ marginBottom: 30 }} key={index}>
        <Text style={[text.scoreHistory, { textAlign: 'center' }]}>
          {player.name}
        </Text>
        <Text style={text.score}>Score: {currentScore}</Text>

        {currentScore < 1 ?
          <Text style={text.smallCentered}>Sorry, you don't have enough points to wager!</Text>
          :
          <View>
            <View style={styles.buttonRowContainer}>
              <TextInput
                style={[
                  styles.marginedInput,
                  { display: input[index].submitted ? 'none' : 'flex' },
                ]}
                onChangeText={(value) => handleChange(index, value)}
                value={input[index].wager}
                maxLength={6}
                keyboardType="number-pad"
                placeholder="Add wager..."
                placeholderTextColor={colors.placeholderText}
              />
            </View>
            <View
              style={[
                styles.buttonRowContainer,
                { display: input[index].submitted ? 'none' : 'flex' },
              ]}
            >
              {renderWagerPressable(false)}
              {renderWagerPressable(true)}
            </View>
          </View>}
        <View
          style={[
            styles.buttonRowContainer,
            { display: input[index].submitted ? 'flex' : 'none' },
          ]}
        >
          <Text style={text.mainText}>Submitted!</Text>
        </View>
      </View >
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text style={text.finalJeopardyTitle}>Final Jeopardy</Text>
      {players.map((player, index) => wagerInput(player, index))}
      <Pressable
        style={buttons.finalJeopardy}
        onPress={() => navigation.navigate('FinalScores', {
          players: players,
          gameId: gameId,
        })}
      >
        <Text style={text.smallCentered}>See Final Scores</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}
