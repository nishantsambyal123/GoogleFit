import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {convertDate} from './helper';
import {useNavigation} from '@react-navigation/native';
import Fitness from '@ovalmoney/react-native-fitness';
import GFit from './GFiit';
import DateTimePicker from '@react-native-community/datetimepicker';
import ItemData from './itemSteps';

const HomeScreen = ({params}) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('');
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [endDate, seEndDate] = useState(new Date());

  useEffect(() => {
    requestPermissions();
  }, []);

  const showMode = mode => {
    setMode(mode);
    setShow(true);
  };

  const selectStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const selectEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    seEndDate(currentDate);
  };

  const requestPermissions = () => {
    const permissions = [
      {
        kind: Fitness.PermissionKinds.Steps,
        access: Fitness.PermissionAccesses.Write,
      },
      {
        kind: Fitness.PermissionKinds.Distances,
        access: Fitness.PermissionAccesses.Write,
      },
    ];

    Fitness.requestPermissions(permissions)
      .then(authorized => {
        // console.log('authorized', authorized);
        // Do something
      })
      .catch(error => {
        // console.log('error while authorization', error);
        // Do something
      });
  };

  const showStepCount = () => {
    if (startDate <= endDate) {
      const permissions = [
        {
          kind: Fitness.PermissionKinds.Steps,
          access: Fitness.PermissionAccesses.Write,
        },
        {
          kind: Fitness.PermissionKinds.Distances,
          access: Fitness.PermissionAccesses.Write,
        },
      ];
      Fitness.isAuthorized(permissions)
        .then(authorized => {
          if (authorized) {
            GFit.getSteps({startDate, endDate}).then(data => {
              // console.log(data);
              setData(data);
            });
          } else {
            requestPermissions();
          }
          // Do something
        })
        .catch(error => {
          requestPermissions();
          // Do something
        });
    }
  };

  const datePicker = method => (
    <DateTimePicker
      value={startDate}
      mode={'date'}
      is24Hour={true}
      display="default"
      onChange={method}
      maximumDate={new Date()}
      textColor="red"
    />
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateBox}>
        <Text style={styles.titleText}>Select start Date</Text>

        <TouchableOpacity
          style={styles.startDateContainer}
          onPress={() => {
            showMode('start');
          }}>
          <Text style={styles.dateText}>{convertDate(startDate)}</Text>
          <Image style={styles.tinyLogo} source={require('./calendar.png')} />
        </TouchableOpacity>

        <Text style={{...styles.titleText, marginTop: 20}}>
          Select End Date
        </Text>
        <TouchableOpacity
          style={styles.startDateContainer}
          onPress={() => {
            showMode('end');
          }}>
          <Text style={styles.dateText}>{convertDate(endDate)}</Text>
          <Image style={styles.tinyLogo} source={require('./calendar.png')} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          showStepCount();
        }}>
        <Text style={styles.showStepCount}>show step count</Text>
      </TouchableOpacity>
      {endDate < startDate && (
        <Text style={styles.errorMsg}>
          End date cannot be less than start date
        </Text>
      )}

      <FlatList
        data={data}
        renderItem={renderItem => <ItemData data={renderItem} />}
        keyExtractor={(item, index) => index.toString()}
      />

      {show && datePicker(mode === 'start' ? selectStartDate : selectEndDate)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startDateContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  tinyLogo: {
    marginLeft: 20,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  titleText: {
    textAlign: 'center',
  },
  dateText: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    color: 'black',
    backgroundColor: '#eee',
    fontSize: 20,
  },
  showStepCount: {
    backgroundColor: '#990f02',
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
  errorMsg: {
    color: 'red',
    marginTop: 10,
  },
});

export default HomeScreen;
