import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({params}) => {
  const navigation = useNavigation();
  function checkAndTakePermission() {
    checkAuthorization()
      .then(val => {
        if (!val) {
          googleFitAuth();
        }
        console.log('checkAuthorization in if case', val);
      })
      .catch(err => {
        console.log('checkAuthorization Catch', err);
      });
  }

  async function checkAuthorization() {
    await GoogleFit.checkIsAuthorized();
    console.log('checkAuthorization', GoogleFit.isAuthorized);
    return GoogleFit.isAuthorized;
  }
  function googleFitAuth() {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('success');
          return 'AUTH_SUCCESS';
        } else {
          console.log(authResult.message);
          return authResult.message;
        }
      })
      .catch(() => {
        console.log('error');
        return 'AUTH_ERROR';
      });
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Google Fit App Camera Permission',
          message:
            'Google Fit needs access to your Location ' +
            'so you can take track.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        checkAndTakePermission();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          requestCameraPermission();
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Check and Take permission</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (checkAuthorization()) {
            GoogleFit.startRecording(callback => {
              console.log(callback);
              navigation.navigate('DetailScreen');
              // Process data from Google Fit Recording API (no google fit app needed)
            });
          } else {
            alert('check authorization failed');
          }
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Start Tracking</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
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
});

export default HomeScreen;
