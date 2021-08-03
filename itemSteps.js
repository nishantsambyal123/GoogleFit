import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {formatDate, getHourMinutes} from './helper';
import moment from 'moment';

const itemSteps = props => {
  const {item} = props.data;
  const date = formatDate(
    item.startDate.substring(0, item.startDate.length - 9),
  );
  const endDate = formatDate(
    item.endDate.substring(0, item.endDate.length - 9),
  );

  //   console.log(date);
  //   console.log(endDate);

  const year = date[0];
  const month = date[1];
  const day = date[2];
  const dayName = date[3];
  const startHours = date[4];
  const startMinutes = date[5];

  const endHours = endDate[4];
  const endMinutes = endDate[5];

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
            <Text style={styles.dayName}>
              {getHourMinutes(item.startDate) + ' to '}
            </Text>
            <Text style={styles.dayName}>{getHourMinutes(item.endDate)}</Text>
          </View>

          <View style={styles.stepCountContainer}>
            <Text style={styles.stepsText}>steps count: </Text>
            <Text style={styles.stepsText}>{item.quantity}</Text>
          </View>
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
    margin: 6,
    elevation: 6,
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
  stepCountContainer: {
    flexDirection: 'row',
  },
  stepsText: {
    color: 'crimson',
  },
});

export default itemSteps;
