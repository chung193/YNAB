import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { getDBConnection } from './src/lib/db-service.ts';
import { initData, checkIfExists } from './src/lib/initData.ts';
import Main from './src/routers/Main.tsx';
const App = () => {
  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await initData(db);
      const check = await checkIfExists(db, "wallet");
      console.log("====", check);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </>
  );
};
export default App;