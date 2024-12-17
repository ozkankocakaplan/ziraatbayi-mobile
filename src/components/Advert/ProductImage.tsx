import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetProductImageQuery} from '../../services/advertService';
import Icon from '../Icon/Icon';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {faClose, faGripHorizontal} from '@fortawesome/free-solid-svg-icons';

export default function ProductImage({
  imageUrl,
  isImageView = false,
}: {
  imageUrl: string;
  isImageView?: boolean;
}) {
  const {data, isLoading, isError} = useGetProductImageQuery({
    endpoint: imageUrl,
  });
  const [image, setImage] = useState<string | null>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  useEffect(() => {
    if (data) {
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(data);
      fileReaderInstance.onload = () => {
        setImage(fileReaderInstance.result as string);
      };
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
        <>
          {isImageView ? (
            <TouchableOpacity
              activeOpacity={isImageView ? 0.6 : 1}
              onPress={() => {
                if (isImageView) {
                  setShowImageViewer(true);
                }
              }}>
              <Image
                source={{uri: image}}
                style={{width: '100%', height: '100%', aspectRatio: 1}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <>
              <Image
                source={{uri: image}}
                style={{width: '100%', height: '100%', aspectRatio: 1}}
                resizeMode="contain"
              />
            </>
          )}

          <Modal visible={showImageViewer} transparent={true}>
            <ImageViewer
              enableSwipeDown
              onSwipeDown={() => {
                setShowImageViewer(false);
              }}
              renderHeader={() => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setShowImageViewer(false);
                    }}
                    style={{
                      position: 'absolute',
                      top: Platform.OS === 'ios' ? 50 : 20,
                      right: 20,
                      zIndex: 9999,
                    }}>
                    <Icon icon={faClose} size={30} color="white" />
                  </TouchableOpacity>
                );
              }}
              imageUrls={[
                {
                  url: image,
                },
              ]}
            />
          </Modal>
        </>
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
