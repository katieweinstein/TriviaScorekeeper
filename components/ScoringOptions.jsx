import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles, buttons, text, colors } from './styles/styles';
import { getScoreForPlayer } from '../api/moves';

export default function ScoringOptions({
  setDailyDoubleScore,
  moveInfo,
  gameInfo,
  modalVisible,
  setModalVisible,
  scores,
  setScores,
  double,
  setDouble,
}) {
  return (
    <View style={styles.scoreboardButtonContainer}>
      {/* Daily Double */}
      <Pressable
        style={[
          buttons.dailyDouble,
          typeof moveInfo.player === 'string'
            ? { backgroundColor: 'grey' }
            : { backgroundColor: colors.orange },
        ]}
        onPress={async () => {
          setModalVisible(!modalVisible);
          const scoreObj = await getScoreForPlayer(
            gameInfo.gameId,
            moveInfo.player.id
          );
          setDailyDoubleScore(scoreObj.total);
        }}
        disabled={typeof moveInfo.player === 'string'}
      >
        <Text style={text.smallCentered}>Double Down</Text>
      </Pressable>
      {/* Negative Score */}
      <Pressable
        style={buttons.negativeScore}
        onPress={() => {
          setScores(scores.map((item) => item * -1));
        }}
      >
        <Text style={text.smallCentered}>—</Text>
      </Pressable>
      {/* Double Jeopardy */}
      <Pressable
        style={buttons.doubleJeopardy}
        onPress={() => {
          setDouble(!double);
          double
            ? setScores([200, 400, 600, 800, 1000])
            : setScores([400, 800, 1200, 1600, 2000]);
        }}
      >
        <Text style={text.smallCentered}>
          {double ? 'Single Scoring' : 'Double Scoring'}
        </Text>
      </Pressable>
    </View>
  );
}
