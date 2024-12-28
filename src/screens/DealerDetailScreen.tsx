import React, {useEffect} from 'react';

import AdvertCard from '../components/Advert/AdvertCard';
import Container from '../components/Container/Container';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import AdvertResponse from '../payload/response/AdvertResponse';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DealerApi} from '../services/dealerService';
import SubscriptionApi from '../services/subscriptionService';

export default function DealerDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'DealerDetailScreen'>) {
  const {id} = route.params;
  const {data, refetch} = DealerApi.useGetDealerDetailQuery(id);

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  return (
    <Page showGoBack header title={data?.entity.dealer.companyName}>
      <Container>
        <CustomFlatList
          numColumns={3}
          notFoundText="İlan bulunamadı"
          data={data?.entity.adverts || []}
          renderItem={(item: AdvertResponse) => {
            return <AdvertCard key={item.id} item={item} />;
          }}
        />
      </Container>
    </Page>
  );
}
