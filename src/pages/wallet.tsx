import React, { useCallback, useEffect, useState } from 'react';
import { getDBConnection, getItems, saveItems } from '../lib/db-service.ts';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Wallet = () => {

  const [name, onChangeName] = useState('');
  const [wallets, setWallet] = useState([]);
  const loadData = async () => {
    try {
      const db = await getDBConnection();
      const data = await getItems(db, "wallet");
      setWallet(data);
      console.log("====", data);
    } catch (error) {
      console.error(error);
    }
  }
  const onPress = async () => {
    const db = await getDBConnection();
    let data = [];
    let item = {
      value: name
    };
    data.push(item);
    await saveItems(db, "wallet", data);
    await loadData();
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={wallets}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={item => item.wallet_id}
        />
      </SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Add new</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "black"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 12,
    width: 200
  }
});
export default Wallet;