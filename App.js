import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import {
  PERMISSIONS,
  openSettings,
  check,
  request,
  RESULTS,
} from 'react-native-permissions';
import {useCameraDevices, Camera} from 'react-native-vision-camera';

export default function App() {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.CAMERA).then(status => {
        if (status === RESULTS.GRANTED) {
        } else if (status === RESULTS.DENIED) {
          request(PERMISSIONS.IOS.CAMERA);
        } else {
          _showAlertPermission();
        }
      });
    } else if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.CAMERA).then(status => {
        if (status === RESULTS.GRANTED) {
        } else if (status === RESULTS.DENIED) {
          request(PERMISSIONS.ANDROID.CAMERA);
        } else {
          _showAlertPermission();
        }
      });
    }
  }, []);

  function _showAlertPermission() {
    Alert.alert(
      'Information',
      'Permission is blocked, enable manually on setting',
      [
        {
          text: 'Not Now',
          onPress: () => {},
        },
        {
          text: 'Goto Setting',
          onPress: () => openSettings(),
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <View style={styles.container}>
      {device ? (
        <Camera style={styles.wrapCamera} device={device} isActive={true} />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  wrapCamera: {
    height: 300,
    width: 300,
    backgroundColor: 'green',
  },
});
