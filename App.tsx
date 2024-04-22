import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Main from './src/routers/Main.tsx';
const App = () => {
  
  return (
    <>
    <NavigationContainer>
    <Main/>
    </NavigationContainer>
    </>
  );
};
export default App;