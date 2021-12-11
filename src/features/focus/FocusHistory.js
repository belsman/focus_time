import React from 'react';

import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import RoundedButton from '../../components/RoundedButton';

import size from '../../utils/size';
import color from '../../utils/color';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.focusSubject(item.status)}>{item.title}</Text>;
};

const FocusHistory = ({ history, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      {!!history.length && (
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.focusHeader}>Things you are focused on: </Text>
            <FlatList
              style={{ borderColor: 'blue', marginTop: size.sm }}
              contentContainerStyle={{ flex: 1 }}
              data={history}
              renderItem={HistoryItem}
            />
          </SafeAreaView>
          <RoundedButton
            size={60}
            title="clear"
            style={styles.clearButton}
            onPress={() => clearHistory()}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  focusHeader: {
    color: color.white,
    textAlign: 'center',
    fontSize: size.lg,
  },

  focusSubject: (status) => ({
    textAlign: 'center',
    color: status === 1 ? 'green' : 'red',
    marginVertical: 4,
    fontSize: size.md,
  }),
  
  clearButton: {
    position: 'absolute',
    bottom: 0,
    left: Dimensions.get('window').width / 2 - 30,
  },
});

export default FocusHistory;
