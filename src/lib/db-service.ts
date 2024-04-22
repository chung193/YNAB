import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase, query: string) => {
  // create table if not exists
  await db.executeSql(query);
};

export const getItems = async (db: SQLiteDatabase, tableName: string): Promise<[]> => {
  try {
    const items : any = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index))
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get data !!!');
  }
};

export const saveItems = async (db: SQLiteDatabase, tableName:string, items: any) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    items.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, tableName:string, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase, tableName:string) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};