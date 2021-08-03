import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {formatDate} from './helper';

const itemSteps = props => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.line} />
      </View>
      <Text>
        {/* {JSON.stringify(formatDate(new Date().toISOString(props.startDate)))} */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
  },
  line: {
    height: '100%',
    width: 5,
    backgroundColor: 'blue',
  },
});

export default itemSteps;
