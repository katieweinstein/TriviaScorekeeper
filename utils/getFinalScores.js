export const getAllFinalScores = (scoresObj) => {
  scoresObj
    .filter((score) => score.player_id === player.id)
    .reduce(reducer, 0)
  return scores;
}
