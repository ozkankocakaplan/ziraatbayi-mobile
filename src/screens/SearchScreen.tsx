import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {AdvertApi} from '../services/advertService';
import Container from '../components/Container/Container';
import Page from '../components/Page/Page';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import AdvertResponse from '../payload/response/AdvertResponse';
import AdvertCard from '../components/Advert/AdvertCard';

export default function SearchScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'SearchScreen'>) {
  const search = route.params.query;
  const {data, error} = AdvertApi.useSearchAdvertsByNameQuery(search);

  return (
    <Page showGoBack header title="Arama Sonuçları">
      <Container>
        {data && (
          <CustomFlatList
            numColumns={3}
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
