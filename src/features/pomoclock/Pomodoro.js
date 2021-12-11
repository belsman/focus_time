import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Platform,
  StyleSheet,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import RoundedButton from '../../components/RoundedButton';
import Countdown from '../../components/Countdown';

import color from '../../utils/color';
import size from '../../utils/size';

function Pomodoro({ title, onTimerEnd, onClearFocusSubject }) {
  useKeepAwake();
  const [isStated, setIsStarted] = useState(true);
  const [progress, setProgress] = useState(1);
  const [presetTime, setPresetTime] = useState(10);

  const clearFocusSubject = () => onClearFocusSubject();

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onChangePresetTime = (time) => {
    setPresetTime(time);
    setProgress(1);
    setIsStarted(false);
  };

  const timerEnd = () => {
    setPresetTime(presetTime);
    setProgress(1);
    setIsStarted(false);
    vibrate();
    onTimerEnd();
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.partOne}>
        <Countdown
          time={presetTime}
          isPaused={!isStated}
          onProgress={onProgress}
          onEndTimer={timerEnd}
        />
        <Text style={styles.focusedInfo}>
          Focusing on:{'\n'}
          <Text style={styles.focusedInfo}>{title}</Text>
        </Text>
      </View>

      <View>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 8 }}
        />
      </View>

      <View style={styles.partThree}>
        <View style={styles.selectime}>
          <RoundedButton
            title={10}
            size={70}
            onPress={() => onChangePresetTime(10 * 60)}
          />

          <RoundedButton
            title={15}
            size={70}
            onPress={() => onChangePresetTime(15 * 60)}
          />

          <RoundedButton
            title={20}
            size={70}
            onPress={() => onChangePresetTime(20 * 60)}
          />
        </View>

        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          {isStated ? (
            <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
          ) : (
            <RoundedButton title="Play" onPress={() => setIsStarted(true)} />
          )}
        </View>

        <View style={{ marginBottom: 16, paddingStart: 16 }}>
          <RoundedButton title="-" size={50} onPress={onClearFocusSubject} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  partOne: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  partThree: {
    flex: 1,
  },
  focusedInfo: {
    fontSize: size.lg,
    textAlign: 'center',
    color: color.white,
  },
  selectime: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: size.sm,
  },
});

export default Pomodoro;
