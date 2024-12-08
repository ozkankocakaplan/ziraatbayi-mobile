import React, {useRef, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomText from '../Text/Text';

const ShowMoreButton = ({
  onPress,
  isShow,
}: {
  onPress: () => boolean;
  isShow: boolean;
}) => {
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const [isExpanded, setIsExpanded] = useState(isShow);
  console.log('isShow', isShow);
  useEffect(() => {
    if (!isShow) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [isShow]);

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const handlePress = () => {
    let result = onPress();
    if (!result) {
      return;
    }
    Animated.timing(translateYAnim, {
      toValue: isExpanded ? 0 : -300,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsExpanded(!isExpanded);
    });
  };
  if (!isExpanded) {
    return null;
  }
  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: translateYAnim}]}]}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <CustomText color="default">Daha Fazla Göster</CustomText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    zIndex: 9999,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 7,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShowMoreButton;
