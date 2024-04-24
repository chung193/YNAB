import { createTable, executeQuery } from './db-service';
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);
const createTableWallet: string = "create table if not EXISTS wallet (wallet_id int AUTO_INCREMENT PRIMARY KEY,name VARCHAR(50) NOT NULL)";
const createTableCategory: string = "create table if not EXISTS category (category_id int AUTO_INCREMENT PRIMARY KEY,name VARCHAR(50) NOT NULL)";
const createTableTransaction: string = "create table if not EXISTS transaction (transaction_id int AUTO_INCREMENT PRIMARY KEY, category_id int, wallet_id int, amount int not null, date datetime not null, note VARCHAR(255))";

export const initData = async (db: SQLiteDatabase): any => {
    await createTable(db, createTableWallet);
    await createTable(db, createTableCategory);
    await createTable(db, createTableTransaction);
}

export const checkIfExists = async (db: SQLiteDatabase, tableName: string) => {
    let response = await executeQuery(db, "SHOW TABLES LIKE '${tableName}'");
    return response;
}