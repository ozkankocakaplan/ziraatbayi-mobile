import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/Button/Button';
import AdvertCard from '../components/Advert/AdvertCard';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faFilter} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import {categoryApi} from '../services/categoryService';
import Container from '../components/Container/Container';

import {BottomTabParamList, RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';

import {AdvertApi} from '../services/advertService';
import AdvertResponse from '../payload/response/AdvertResponse';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function DealerDetailScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const {navigation} = props;
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const {data: categories} = categoryApi.useGetCategoriesQuery();
  const {data, isLoading, error} = AdvertApi.useGetShowCaseAdvertsQuery();

  const [search, setSearch] = useState('');
  return (
    <>
      <Page showGoBack header title="Bayi Adı">
        <Container>
          <HeaderRow>
            <SearchInput
              value={search}
              onChangeText={setSearch}
              returnKeyLabel="search"
              returnKeyType="search"
              placeholder="Ara..."
              onSubmitEditing={() => {
                navigation.navigate('SearchScreen', {query: search});
              }}
            />
            <FilterIconContainer
              onPress={() => {
                bottomSheetRef.current?.open();
              }}>
              <FontAwesomeIcon icon={faFilter} size={24} color="#333" />
            </FilterIconContainer>
          </HeaderRow>
          <CustomFlatList
            numColumns={3}
            data={data?.list || []}
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
  margin-horizontal: 10px;
  margin-vertical: 10px;
`;

const SearchInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 100px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  background-color: #fff;
  width: 100%;
  flex: 0.9;

  top: ${Platform.OS === 'android' ? '5px' : '0px'};
`;

const FilterIconContainer = styled(TouchableOpacity)`
  flex: 0.1;
  align-items: flex-end;
  justify-content: center;
`;
