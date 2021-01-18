import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer} from '@react-navigation/native'
import { Provider } from 'react-redux'
import HomeScreen from './src/Pages/HomeScreen.js'
import DetailPage from './src/Pages/DetailPage.js'
import stores from './src/Stores'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={stores}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MoviList" component={HomeScreen}  options={{headerShown: false}}/>
          <Stack.Screen name="MovieDetail" component={DetailPage} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
