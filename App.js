import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Alert } from 'react-native';
import {
  PERMISSIONS,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import { useCameraDevices, Camera } from 'react-native-vision-camera'

export default function App() {
  const devices = useCameraDevices('wide-angle-camera')
  const device =  devices.front

  useEffect(() => {
    let arrayCheck = [];
    if (Platform.OS === 'ios') {
      arrayCheck = [
        PERMISSIONS.IOS.CAMERA,
      ];
    } else {
      arrayCheck = [
        PERMISSIONS.ANDROID.CAMERA,
      ];
    }
    requestMultiple(arrayCheck)
      .then(() => {})
      .catch(() => {
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
      });
  }, [])

  return (
    <View style={styles.container}>
      {device ? (
        <Camera
          style={styles.wrapCamera}
          device={device}
          isActive={true}
        />
      ): (<ActivityIndicator size={'large'} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  wrapCamera: {
    height: 300,
    width: 300,
    backgroundColor: 'green'
  }
})
