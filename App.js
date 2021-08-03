import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppStack from './Route';
const App = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <AppStack />
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
