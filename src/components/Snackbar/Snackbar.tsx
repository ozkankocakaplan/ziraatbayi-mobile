import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import {Col, Row} from '../../constant/GlobalStyled';
import ProductImage from '../Advert/ProductImage';
import {NotificationData} from '../../firebase/FirebaseNotification';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigator';
import {generateChatId} from '../../helper/Helper';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import ProductResponse from '../../payload/response/ProductResponse';

interface SnackbarProps {
  visible: boolean;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  data?: NotificationData;
}

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  duration = 3000,
  onDismiss,
  data,
}) => {
  const userId = useSelector(
    (state: RootState) => state.auth.user?.id.toString() || '',
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          if (onDismiss) onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, slideAnim, duration, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.snackbarContainer,
        {transform: [{translateY: slideAnim}]},
      ]}>
      <TouchableOpacity
        onPress={() => {
          const isSender = data?.senderId === userId;
          const senderFullName = data?.senderFullName || '';
          const receiverFullName = data?.receiverFullName || '';

          navigation.navigate('ChatRoomScreen', {
            chatId: generateChatId(
              Number(data?.senderId),
              Number(data?.receiverId),
              data?.advertId || 0,
            ),
            receiverFullName: !isSender ? senderFullName : receiverFullName,
            senderFullName: !isSender ? receiverFullName : senderFullName,
            senderId: userId,
            receiverId: data?.senderId || '',
            product: data?.product || ({} as ProductResponse),
            advertId: data?.advertId || 0,
          });
          onDismiss && onDismiss();
        }}
        activeOpacity={0.4}
        style={{padding: 15}}>
        <Row gap={10}>
          <ImageContainer>
            <ProductImage imageUrl={data?.productImage || ''} />
          </ImageContainer>
          <Col>
            <CustomText>{message}</CustomText>
          </Col>
        </Row>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1F8505',
    zIndex: 9999,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
const ImageContainer = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
`;
export default Snackbar;
