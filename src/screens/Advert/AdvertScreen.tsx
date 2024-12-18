import React, {useEffect} from 'react';
import {AdvertApi} from '../../services/advertService';
import Container from '../../components/Container/Container';
import Page from '../../components/Page/Page';
import CustomText from '../../components/Text/Text';
import Button from '../../components/Button/Button';

import AdvertResponse from '../../payload/response/AdvertResponse';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import AdvertListItem from './AdvertListItem';

export default function AdvertScreen(props: any) {
  const {data: adverts, refetch} = AdvertApi.useGetAdvertsByDealerIdQuery();
  const {navigation} = props;

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  return (
    <Page header showNotification showMessage title="İlanlarım">
      {adverts && adverts.list.length > 0 ? (
        <Container pb={10} pl={10} pr={10}>
          <Container>
            <Container mt={10}>
              <CustomFlatList
                isSearchable
                data={[...adverts.list].sort(
                  (a: AdvertResponse, b: AdvertResponse) =>
                    new Date(a.expiryDate) > new Date(b.expiryDate) ? 1 : -1,
                )}
                renderItem={(item: AdvertResponse) => {
                  return <AdvertListItem item={item} key={item.id} />;
                }}
              />
            </Container>
            <Container flex={0.07}>
              <Button
                onPress={() => props.navigation.navigate('AddAdvertScreen')}
                text="YENİ İLAN EKLE"
              />
            </Container>
          </Container>
        </Container>
      ) : (
        <Container gap={10} aItems="center" jContent="center">
          <CustomText color="black" fontSizes="body4">
            Henüz hiç ilan eklemediniz.
          </CustomText>
          <Button
            text="İlan Ekle"
            onPress={() => props.navigation.navigate('AddAdvertScreen')}
          />
        </Container>
      )}
    </Page>
  );
}
