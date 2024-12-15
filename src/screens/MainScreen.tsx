import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {CategoryApi} from '../services/categoryService';
import Container from '../components/Container/Container';
import useThemeColors from '../constant/useColor';
import CustomText from '../components/Text/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';

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
  useEffect(() => {
    props.navigation.addListener('focus', loadCategories);
  }, []);
  const loadCategories = () => {
    refetchCategories();
  };
  useEffect(() => {
    if (!isLoading) {
      props.navigation.replace('BottomTabMenu');
    }
  }, [isLoading]);
  return (
    <Container bgColor={colors.primary} jContent="center" aItems="center">
      <CustomText>Yükleniyor</CustomText>
    </Container>
  );
}
