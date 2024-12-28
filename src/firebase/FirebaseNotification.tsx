import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import Snackbar from '../components/Snackbar/Snackbar';
import ProductResponse from '../payload/response/ProductResponse';
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {generateChatId} from '../helper/Helper';

export interface NotificationData {
  productId: string;
  productImage: string;
  receiverId: string;
  senderId: string;
  receiverFullName: string;
  senderFullName: string;
  product: ProductResponse;
  advertId: number;
}
export default function FirebaseNotification() {
  const currentScreen = useNavigationState(
    state => state?.routes?.[state.index]?.name,
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {selectedChatId} = useSelector((state: RootState) => state.advert);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarData, setSnackbarData] = useState<NotificationData>(
    {} as NotificationData,
  );
  const userId = useSelector(
    (state: RootState) => state.auth.user?.id.toString() || '',
  );

  useEffect(() => {
    const onMessage = messaging().onMessage(async remoteMessage => {
      getNotificationContent(remoteMessage.data, remoteMessage);
    });
    const onNotificationOpenedApp = messaging().onNotificationOpenedApp(
      remoteMessage => {
        goToChatRoom(remoteMessage.data, remoteMessage);
      },
    );
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          goToChatRoom(remoteMessage.data, remoteMessage);
        }
      });

    return () => {
      onMessage();
      onNotificationOpenedApp();
      setShowSnackbar(false);
      setSnackbarMessage('');
    };
  }, []);

  const goToChatRoom = (data: any, remoteMessage?: any) => {
    let notificationData = data;
    notificationData.product = JSON.parse(notificationData.product);

    const isSender = notificationData?.senderId === userId;
    const senderFullName = notificationData?.senderFullName || '';
    const receiverFullName = notificationData?.receiverFullName || '';

    navigation.navigate('ChatRoomScreen', {
      chatId: generateChatId(
        Number(notificationData?.senderId),
        Number(notificationData?.receiverId),
        notificationData?.advertId || 0,
      ),
      receiverFullName: !isSender ? senderFullName : receiverFullName,
      senderFullName: !isSender ? receiverFullName : senderFullName,
      senderId: userId,
      receiverId: notificationData?.senderId || '',
      product: notificationData?.product || ({} as ProductResponse),
      advertId: notificationData?.advertId || 0,
    });
  };

  const getNotificationContent = (data: any, remoteMessage?: any) => {
    let notificationTitle = remoteMessage?.notification?.title;
    let notificationBody = remoteMessage?.notification?.body;
    let notificationData = data;
    notificationData.product = JSON.parse(notificationData.product);
    let chatId = generateChatId(
      Number(notificationData.senderId),
      Number(notificationData.receiverId),
      notificationData.advertId,
    );

    if (selectedChatId !== chatId && currentScreen !== 'ChatRoomScreen') {
      setSnackbarData(notificationData);
      setShowSnackbar(true);
      setSnackbarMessage(notificationTitle + '\n' + notificationBody);
    }
    return;
  };
  return (
    <>
      <Snackbar
        onDismiss={() => {
          setSnackbarData({} as NotificationData);
          setSnackbarMessage('');
          setShowSnackbar(false);
        }}
        data={snackbarData}
        visible={showSnackbar}
        message={snackbarMessage}
      />
    </>
  );
}
