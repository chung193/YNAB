import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Category from '../pages/category';
import Wallet from '../pages/wallet';
import Transactions from '../pages/transactions';
import Personal from '../pages/transactions';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

export default function Main() {
  const Tab = createBottomTabNavigator();

  function WalletScreen({ navigation }) {
    return (
      <Wallet navigation={navigation} />
    );
  }

  function PersonalScreen({ navigation }) {
    return (
      <Wallet navigation={navigation} />
    );
  }

  function TransactionsScreen({ navigation }) {
    return (
      <Transactions navigation={navigation} />
    );
  }
  function CategoryScreen({ navigation }) {
    return (
      <Category navigation={navigation} />
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="transactions"
        component={TransactionsScreen}
        options={{ title: 'Giao dịch' }}
        tabBarIcon={myIcon}
      />
      <Tab.Screen
        name="category"
        component={CategoryScreen}
        options={{ title: 'Danh mục' }}
        tabBarIcon={myIcon}
      />
      <Tab.Screen
        name="wallet"
        component={WalletScreen}
        options={{ title: 'Ví' }}
        tabBarIcon={myIcon}
      />
      <Tab.Screen
        name="personal"
        component={PersonalScreen}
        options={{ title: 'Cá nhân' }}
        tabBarIcon={myIcon}
      />
    </Tab.Navigator>
  );
}