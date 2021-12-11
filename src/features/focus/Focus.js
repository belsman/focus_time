import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

import FocusHistory from './FocusHistory';
import RoundedButton from '../../components/RoundedButton';

import color from '../../utils/color';
import size from '../../utils/size';


function Focus({ tasks, setFocusSubject, clearTasks }) {
  const [focusInput, setFocusInput] = useState(null);

  const onAddFocus = () => {
    if (focusInput) {
      setFocusSubject(focusInput);
    }
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>What would you like to foucs on?</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.focusInputText}
            defaultValue={focusInput}
            onChangeText={(focus) => setFocusInput(focus)}
          />
          <RoundedButton size={50} title="+" onPress={() => onAddFocus()} />
        </View>
      </View>
      <View style={{ flex: 0.6 }}>
        <FocusHistory history={tasks} onClear={clearTasks} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.sm,
    paddingVertical: size.md,
  },
  title: {
    color: color.white,
    fontSize: size.lg,
    fontWeight: '500',
    marginBottom: size.sm,
  },
  focusInputText: {
    backgroundColor: color.white,
    height: size.xxl,
    fontSize: size.lg,
    borderRadius: 5,
    flex: 1,
    marginEnd: size.sm,
    paddingHorizontal: size.sm,
  },
});

export default Focus;
