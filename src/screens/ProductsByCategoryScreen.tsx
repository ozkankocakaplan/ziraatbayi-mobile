import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import Container from '../components/Container/Container';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import AdvertResponse from '../payload/response/AdvertResponse';
import AdvertCard from '../components/Advert/AdvertCard';
import {AdvertApi} from '../services/advertService';

export default function ProductsByCategoryScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ProductsByCategoryScreen'>) {
  const {category} = route.params;

  const {data, refetch} = AdvertApi.useGetAdvertsByCategoryIdQuery(category.id);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadData();
    });
  }, []);

  const loadData = () => {
    refetch();
  };
  return (
    <Page showGoBack header title={category.name + ' Ürünleri'}>
      <Container>
        {data && (
          <CustomFlatList
            numColumns={3}
            handleRefresh={loadData}
            data={data?.list || []}
            renderItem={(item: AdvertResponse) => {
              return <AdvertCard key={item.id} item={item} />;
            }}
          />
        )}
      </Container>
    </Page>
  );
}
