import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetProductImageQuery} from '../../services/advertService';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Icon from '../Icon/Icon';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {ActivityIndicator} from 'react-native';

export default function ProductImage({imageUrl}: {imageUrl: string}) {
  const {data, isLoading, isError} = useGetProductImageQuery({
    endpoint: imageUrl,
  });
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (data) {
      const url = URL.createObjectURL(data);
      setImage(url);
    }
  }, [data]);

  if (isLoading && !image) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="small" color="green" />
      </View>
    );
  } else {
    if (image != null) {
      return (
        <Image
          source={{uri: image}}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isError ? '#E1EAF1' : 'transparent',
          }}>
          <Icon color="white" size={50} icon={faImage} />
        </View>
      );
    }
  }
}
