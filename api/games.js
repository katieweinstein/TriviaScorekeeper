import * as SQLite from 'expo-sqlite';

const createPlayerArray = (players) => {
  let playerArray = [];
  for (let i = 0; i < 6; i++) {
    if (players[i]) {
      playerArray.push(players[i].id);
    } else {
      playerArray.push(null);
    }
  }
  return playerArray;
}

export async function addGameToDB(players) {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  const arr = createPlayerArray(players);
  const today = new Date().toString()
  try {
    const game = await db.runAsync(
      'INSERT INTO Game (player_1, player_2, player_3, player_4, player_5, player_6, date_played) VALUES (?, ?, ?, ?, ?, ?, ?)',
      arr[0],
      arr[1],
      arr[2],
      arr[3],
      arr[4],
      arr[5],
      today);
    console.log(`🎲 Game with id ${game.lastInsertRowId} added to table.`);
    return { gameId: game.lastInsertRowId }
  } catch (err) {
    console.log('Oops, something went wrong adding a game: ', err)
  }
}

// export function getCurrentGameInfo(setGameInfo, gameInfo) {
//   console.log('Current game id: ', currentGameId);
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         'SELECT * FROM Game WHERE id = ?',
//         [currentGameId],
//         (tx, resultSet) => {
//           const data = resultSet.rows._array;
//           console.log('Id: ', data);
//           setGameInfo({ ...gameInfo, gameId: data.id });
//         }
//       );
//     },
//     (err) =>
//       console.log(
//         'Oops, something went wrong getting the current game info: ',
//         err
//       ),
//     () => console.log('Game info obtained.')
//   );
// }
