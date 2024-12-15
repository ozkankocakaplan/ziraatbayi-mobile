import React, {useEffect, useRef} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Button from '../components/Button/Button';
import AdvertCard from '../components/Advert/AdvertCard';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faFilter} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';

import Container from '../components/Container/Container';

import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';

import {AdvertApi} from '../services/advertService';
import AdvertResponse from '../payload/response/AdvertResponse';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useFcmToken from '../hooks/useFcmToken';
import FirebaseApi from '../services/firebaseService';
import DeviceRequest from '../payload/request/DeviceRequest';
import CustomSvgXml from '../components/Icon/CustomSvgXml';
import SendIcon, {FilterIcon} from '../constant/icons';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const {fcmToken} = useFcmToken();
  const {mainCategories} = useSelector((x: RootState) => x.category);
  const {
    data: adverts,
    refetch: refetchAdverts,
    isLoading,
    error,
  } = AdvertApi.useGetShowCaseAdvertsQuery();
  const [useCreateFcmToken] = FirebaseApi.useCreateFirebaseMutation();
  const {navigation} = props;
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (fcmToken && fcmToken.length > 0) {
      let entity: DeviceRequest = {
        deviceToken: fcmToken,
        devicePlatform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
      };
      useCreateFcmToken(entity);
    }
  }, [fcmToken]);

  return (
    <>
      <Page isSearchable header showNotification showMessage>
        <Container>
          <HeaderRow>
            <ButtonContainer
              onPress={() => {
                navigation.navigate('CategoriesScreen', {});
              }}>
              <FontAwesomeIcon icon={faBars} size={16} color="black" />
              <ButtonText>Kategoriler</ButtonText>
            </ButtonContainer>
            <CategoriesScroll horizontal showsHorizontalScrollIndicator={false}>
              <CategoriesContainer>
                {mainCategories.map((category, index) => {
                  return (
                    <Button
                      onPress={() => {
                        if (category.children.length > 0) {
                          navigation.navigate('CategoriesScreen', {
                            initCategory: category,
                          });
                        } else {
                          console.log('ürünler');
                        }
                      }}
                      borderRadius={100}
                      key={category.id}
                      text={category.name}
                      minWidth={110}
                    />
                  );
                })}
              </CategoriesContainer>
            </CategoriesScroll>

            <FilterIconContainer
              onPress={() => {
                bottomSheetRef.current?.open();
              }}>
              <CustomSvgXml
                width={25}
                height={25}
                color="grey"
                xml={FilterIcon}
              />
            </FilterIconContainer>
          </HeaderRow>
          <CustomFlatList
            numColumns={3}
            data={adverts?.list || []}
            renderItem={(item: AdvertResponse) => {
              return <AdvertCard key={item.id} item={item} />;
            }}
          />
        </Container>
      </Page>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 16}}>Alt bilgi içeriği buraya gelecek.</Text>
          <TouchableOpacity onPress={closeBottomSheet} style={{marginTop: 20}}>
            <Text style={{color: 'blue'}}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    </>
  );
}

const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #f0f0f0;
`;

const CategoriesScroll = styled(ScrollView)`
  flex: 0.9;
`;

const CategoriesContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
const ButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 13px 13px;
  background-color: #fff;
  border-radius: 100px;
  border: 1px solid #e0e0e0;
  margin-horizontal: 10px;
  margin-vertical: 10px;
`;

const ButtonText = styled(Text)`
  font-size: 14px;
  color: #333333;
  margin-left: 8px;
`;

const FilterIconContainer = styled(TouchableOpacity)`
  flex: 0.1;
  align-items: flex-end;
  justify-content: center;
  margin-horizontal: 15px;
`;
