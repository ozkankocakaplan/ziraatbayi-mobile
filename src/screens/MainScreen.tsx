import React, {useEffect} from 'react';
import {CategoryApi} from '../services/categoryService';
import Container from '../components/Container/Container';
import useThemeColors from '../constant/useColor';
import CustomText from '../components/Text/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {Image} from 'react-native';
import {LogoBeyazIcon} from '../assets/logo';
import {NotificationApi} from '../services/notificationService';

export default function MainScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const {
    data: categories,
    refetch: refetchCategories,
    isLoading,
    isFetching,
  } = CategoryApi.useGetCategoriesQuery(false);
  const colors = useThemeColors();
  const [getNotificationCount] =
    NotificationApi.useGetNotificationCountMutation();
  useEffect(() => {
    props.navigation.addListener('focus', loadData);
  }, []);
  const loadData = () => {
    refetchCategories();
    getNotificationCount();
  };
  useEffect(() => {
    if (!isLoading) {
      props.navigation.replace('BottomTabMenu');
    }
  }, [isLoading]);
  return (
    <Container bgColor={colors.primary} jContent="center" aItems="center">
      <Image source={LogoBeyazIcon} style={{width: 200, height: 200}} />
    </Container>
  );
}
