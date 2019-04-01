import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Setting Screen</Text>
      </View>
    );
  }
}

export default SettingsScreen;