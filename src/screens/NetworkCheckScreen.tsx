import {View, Text} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import NetworkFailedSvg from '../components/Icon/NetworkFailedSvg';
import ServerFailedSvg from '../components/Icon/ServerFailedSvg';
import {BaseUrl} from '../store/api/BaseApi';
import {SIZES} from '../constant/theme';
import CustomText from '../components/Text/Text';
const NetworkError =
  'İnternete bağlı değilsiniz. Lütfen internete bağlanın ve tekrar deneyin.';
const HealthCheckError =
  'Sunucuyla bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin.';

function NetworkCheckScreen(props: {children: React.ReactNode}) {
  const [networkConnected, setNetworkConnected] = useState<{
    status: boolean | null;
    message: string;
    img: React.ReactNode | null;
  }>({
    status: true,
    message: '',
    img: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        AlertDialog.hideLoading();
      }
      setNetworkConnected({
        status: state.isConnected,
        message: state.isConnected ? '' : NetworkError,
        img: state.isConnected ? null : <NetworkFailedSvg />,
      });
    });
    const unsubhealthcheck = setInterval(() => {
      // CheckServerStatus();
    }, 5000);
    return () => {
      unsubscribe();
      clearInterval(unsubhealthcheck);
    };
  }, []);

  const CheckServerStatus = () => {
    fetch(`${BaseUrl}/actuator/health`)
      .then(res => res.json())
      .then(res => {
        if (res.status !== 'UP') {
          setNetworkConnected({
            status: false,
            message: HealthCheckError,
            img: <ServerFailedSvg />,
          });
        } else {
          setNetworkConnected({
            status: true,
            message: '',
            img: null,
          });
        }
      })
      .catch(er => {
        setNetworkConnected({
          status: false,
          message: HealthCheckError,
          img: <ServerFailedSvg />,
        });
      });
  };

  return !networkConnected.status ? (
    <View
      style={{
        height: SIZES.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {networkConnected?.img}
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <CustomText center sx={{marginTop: 20, lineHeight: 20}} color="black">
          {networkConnected.message}
        </CustomText>
      </View>
    </View>
  ) : (
    props.children
  );
}
export default memo(NetworkCheckScreen);
