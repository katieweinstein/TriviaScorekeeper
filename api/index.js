import * as SQLite from 'expo-sqlite';

/* ONLY USE IN DEV ENVIRONMENT TO REMOVE DATABASE AND START FROM SCRATCH */
// (async function clearTable() {
//   const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
//   try {
//     await db.execAsync('DROP TABLE Player', []);
//     console.log('Player table successfully deleted.')
//   } catch (err) {
//     console.log('Oops, something went wrong removing the Player table: ', err)
//   }
// })();

export async function createPlayerTable() {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)');
    console.log('🧑‍ Player table successfully created or loaded.')
  } catch (err) {
    console.log(
      '❌ Oops, something went wrong creating the Player table: ',
      err
    )
  };
}

export async function createGameTable() {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS Game(id INTEGER PRIMARY KEY NOT NULL, player_1 INTEGER NOT NULL, player_2 INTEGER, player_3 INTEGER, player_4 INTEGER, player_5 INTEGER, player_6 INTEGER, date_played DATETIME NOT NULL, FOREIGN KEY(player_1) REFERENCES Player(id), FOREIGN KEY(player_2) REFERENCES Player(id), FOREIGN KEY(player_3) REFERENCES Player(id), FOREIGN KEY(player_4) REFERENCES Player(id), FOREIGN KEY(player_5) REFERENCES Player(id), FOREIGN KEY(player_6) REFERENCES Player(id))'
    );
    console.log('🎲 Game table successfully created or loaded.')
  } catch (err) {
    console.log('❌ Oops, something went wrong creating the Game table: ', err)
  }
}

export async function createMoveTable() {
  const db = await SQLite.openDatabaseAsync('jeopardy-scorekeeper.db');
  try {
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS Move(id INTEGER PRIMARY KEY NOT NULL, player_id INTEGER NOT NULL, game_id INTEGER NOT NULL, score INTEGER NOT NULL, FOREIGN KEY(player_id) REFERENCES Player(id), FOREIGN KEY(game_id) REFERENCES Game(id))'
    );
    console.log('🚛 Move table successfully created or loaded.')
  } catch (err) {
    console.log('❌ Oops, something went wrong creating the Move table: ', err)
  }
}
