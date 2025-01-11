import {View, Text, Image} from 'react-native';
import React from 'react';
import {LogoIcon} from '../../assets/logo';

export default function Logo() {
  return (
    <Image
      source={LogoIcon}
      style={{width: 175, height: 175}}
      resizeMode="contain"
    />
  );
}
