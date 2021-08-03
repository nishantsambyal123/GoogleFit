import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const DetailScreen = params => {
  const [data, setData] = useState();
  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    const opt = {
      startDate: '2017-01-01T00:00:17.971Z', // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };

    GoogleFit.getDailyStepCountSamples(opt)
      .then(res => {
        console.log('Daily steps >>> ', res);
        setData(res);
      })
      .catch(err => {
        console.warn(err);
      });

    // or with async/await syntax
    // async function fetchData() {
    //   const res = await GoogleFit.getDailyStepCountSamples(opt);
    //   console.log(res);
    // }
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput multiline={true}>{JSON.stringify(data)};</TextInput>
      <FlatList
        data={data}
        renderItem={renderItem => {
          return (
            <View>
              <Text>fdnjfd</Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        key={(item, index) => index}
      />
      <View style={styles.divider} />
      <FlatList
        data={data}
        renderItem={renderItem => {
          return (
            <View>
              <Text>fdnjfd</Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        key={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  button: {
    width: '50%',
    backgroundColor: '#24A0ED',
    alignSelf: 'center',
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
  },
  divider: {
    backgroundColor: 'black',
    height: 1,
    width: '100%',
  },
});

export default DetailScreen;
