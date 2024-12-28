import React, {useEffect} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Button from '../components/Button/Button';
import AdvertCard from '../components/Advert/AdvertCard';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
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
import {FilterIcon} from '../constant/icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {AdvertActions} from '../store/features/advertReducer';
import useThemeColors from '../constant/useColor';

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {fcmToken} = useFcmToken();

  const colors = useThemeColors();
  const {filterBottomSheetRef, isFitered, filteredAdverts} = useSelector(
    (state: RootState) => state.advert,
  );
  const {mainCategories} = useSelector((x: RootState) => x.category);
  const {data: adverts, refetch: refetchAdverts} =
    AdvertApi.useGetShowCaseAdvertsQuery();
  const [useCreateFcmToken] = FirebaseApi.useCreateFirebaseMutation();

  useEffect(() => {
    if (fcmToken && fcmToken.length > 0) {
      let entity: DeviceRequest = {
        deviceToken: fcmToken,
        devicePlatform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
      };
      useCreateFcmToken(entity);
    }
  }, [fcmToken]);
  useEffect(() => {
    navigation.addListener('focus', () => {
      refetchAdverts();
    });
  }, []);
  const openFilter = () => {
    filterBottomSheetRef?.open();
  };
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
                          navigation.navigate('ProductsByCategoryScreen', {
                            category,
                          });
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
                openFilter();
              }}>
              <CustomSvgXml
                width={25}
                height={25}
                color={isFitered ? colors.primary : 'grey'}
                xml={FilterIcon}
              />
            </FilterIconContainer>
          </HeaderRow>
          <CustomFlatList
            handleRefresh={() => {
              refetchAdverts();
            }}
            numColumns={3}
            data={isFitered ? filteredAdverts : adverts?.list || []}
            renderItem={(item: AdvertResponse) => {
              return <AdvertCard key={item.id} item={item} />;
            }}
          />
        </Container>
      </Page>
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
