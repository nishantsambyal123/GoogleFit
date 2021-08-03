import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const AppStackEntry = () => {
  const Stack = createNativeStackNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default AppStackEntry;
