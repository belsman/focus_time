import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Focus from './src/features/focus/Focus';
import PomodoroClock from './src/features/pomoclock/Pomodoro';

import color from './src/utils/color';

const STATUSES = {
  complete: 1,
  cancel: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const addFocusToHistory = (title, status) => {
    setTasks([...tasks, { key: `${Math.random() * tasks.length}`, title, status }]);
  };
  
  const loadTasks = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('focusHistory');
      if (savedItems && JSON.parse(savedItems).length) {
        setTasks(JSON.parse(savedItems));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(tasks));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <PomodoroClock
          title={focusSubject}
          onTimerEnd={() => {
            addFocusToHistory(focusSubject, STATUSES.complete);
            setFocusSubject(null);
          }}
          onClearFocusSubject={() => {
            addFocusToHistory(focusSubject, STATUSES.cancel);
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus
          setFocusSubject={setFocusSubject}
          tasks={tasks}
          clearTasks={() => setTasks([])}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.blue
  },
});
