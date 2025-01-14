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
import {NotificationType} from '../payload/response/NotificationResponse';
import {NotificationApi} from '../services/notificationService';

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
  const [getNotificationCount] =
    NotificationApi.useGetNotificationCountMutation();
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
    const onNotificationOpenedApp = messaging().onNotificationOpenedApp(
      remoteMessage => {
        let notificationType = remoteMessage?.data?.notificationType || '';
        if (
          notificationType != NotificationType.NOTIFICATION_MESSAGE.toString()
        ) {
          getNotificationCount();
        }
      },
    );
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          let notificationType = remoteMessage?.data?.notificationType || '';
          if (
            notificationType ===
            NotificationType.NOTIFICATION_MESSAGE.toString()
          ) {
          } else {
            getNotificationCount();
          }
        }
      });

    return () => {
      setShowSnackbar(false);
      setSnackbarMessage('');
    };
  }, []);

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
