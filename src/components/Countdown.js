import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import size from '../utils/size';
import color from '../utils/color';

import { formatSecondsinMMSS } from '../utils/format-time';

/** This component takes a time(seconds) prop and a state
 * (pause/play is used to control the execution of the countdown)
 */
const Countdown = ({ time, isPaused, onProgress, onEndTimer }) => {
  let _timer = useRef(null);

  const [coundownTime, setCountDownTime] = useState(null);

  const runCountDown = () => {
    setCountDownTime((state) => {
      if (state === 0) {
        clearInterval(_timer.current);
        return state;
      } else {
        const timeLeft = state - 1;
        return timeLeft;
      }
    });
  };

  useEffect(() => {
    setCountDownTime(time);
  }, [time]);

  useEffect(() => {
    onProgress(coundownTime / time);
    if (coundownTime === 0) {
      onEndTimer();
    }
  }, [coundownTime]);

  useEffect(() => {
    if (isPaused) {
      if (_timer.current) {
        clearInterval(_timer.current);
      }
      return;
    }
    _timer.current = setInterval(runCountDown, 1000);
    return () => {
      clearInterval(_timer.current);
    };
  }, [isPaused]);

  return (
    <Text style={styles.formatedTime}>{formatSecondsinMMSS(coundownTime)}</Text>
  );
};

const styles = StyleSheet.create({
  formatedTime: {
    backgroundColor: color.lightblue,
    fontSize: size.xxxl,
    textAlign: 'center',
    fontWeight: 'bold',
    color: color.white,
    padding: size.md,
  },
});

export default Countdown;
