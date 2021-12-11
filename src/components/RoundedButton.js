import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import color from '../utils/color';

function RoundedButton({ size = 125, style = {}, textStyle = {}, ...props }) {
  const roundedStyle = styles(size);

  return (
    <TouchableOpacity
      style={[roundedStyle.button, style]}
      onPress={props.onPress}>
      <Text style={[roundedStyle.buttonLabel, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = (size) =>
  StyleSheet.create({
    button: {
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: color.white,
    },
    buttonLabel: {
      color: color.white,
      fontSize: size / 3,
    },
  });

export default RoundedButton;
