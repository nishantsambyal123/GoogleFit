import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {formatDate} from './helper';

const itemSteps = props => {
  const {item} = props.data;
  const date = formatDate(
    item.startDate.substring(0, item.startDate.length - 5),
  );
  const year = date[0];
  const month = date[1];
  const day = date[2];
  const dayName = date[3];
  const hours = date[4];
  const minutes = date[5];

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.line} />

        <View style={styles.dateContainer}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.date}>{day}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.dayName}>{dayName + ', '}</Text>
            <Text style={styles.dayName}>{hours + ' '}</Text>
            <Text style={styles.dayName}>{minutes}</Text>
          </View>
          <Text>steps goes gerre</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    elevation: 6,
    margin: 2,
    paddingRight: 20,
  },
  line: {
    height: '100%',
    width: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: 'coral',
  },
  month: {
    fontSize: 16,
    color: 'coral',
  },
  date: {
    fontSize: 28,
    color: 'coral',
  },
  dateContainer: {
    padding: 10,
  },
  dayName: {
    fontSize: 16,
    color: 'black',
  },
  timeContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default itemSteps;
