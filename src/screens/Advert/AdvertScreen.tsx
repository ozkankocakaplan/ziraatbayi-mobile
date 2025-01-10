import React, {useEffect, useState} from 'react';
import {AdvertApi} from '../../services/advertService';
import Container from '../../components/Container/Container';
import Page from '../../components/Page/Page';
import CustomText from '../../components/Text/Text';
import Button from '../../components/Button/Button';

import AdvertResponse from '../../payload/response/AdvertResponse';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import AdvertListItem from './AdvertListItem';
import {Col, Flex, Row} from '../../constant/GlobalStyled';
import styled from 'styled-components';
import {View} from 'react-native';
import useThemeColors from '../../constant/useColor';

type SelectedFilter = 'active' | 'passive';
const PassiveColor = '#4CB05750';
export default function AdvertScreen(props: any) {
  const {
    data: adverts,
    refetch,
    isLoading,
  } = AdvertApi.useGetAdvertsByDealerIdQuery();

  const {navigation} = props;
  const colors = useThemeColors();
  const [selectedFilter, setSelectedFilter] =
    React.useState<SelectedFilter>('active');
  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  return (
    <Page header showNotification showMessage title="İlanlarım">
      <Container pb={10} pl={10} pr={10}>
        <Container>
          <Container mt={10}>
            <CustomFlatList
              notFoundText="İlan Bulunamadı"
              customNotFound={
                <Container gap={10} aItems="center" jContent="center">
                  <CustomText color="black" fontSizes="body4">
                    Henüz hiç ilan eklemediniz.
                  </CustomText>
                </Container>
              }
              extraData={
                <FilterContainer>
                  <Flex>
                    <Button
                      onPress={() => setSelectedFilter('active')}
                      borderRadius={100}
                      textColor={
                        selectedFilter === 'active'
                          ? colors.primary
                          : PassiveColor
                      }
                      outline
                      text="Yayında Olanlar"></Button>
                  </Flex>
                  <Flex>
                    <Button
                      onPress={() => setSelectedFilter('passive')}
                      borderRadius={100}
                      textColor={
                        selectedFilter === 'passive'
                          ? colors.primary
                          : PassiveColor
                      }
                      outline
                      text="Yayında Olmayanlar "></Button>
                  </Flex>
                </FilterContainer>
              }
              isSearchable
              listSort={(a: AdvertResponse, b: AdvertResponse) => {
                return a.id - b.id;
              }}
              listFilter={(entity: AdvertResponse, value: string) => {
                const lowerValue = value.toLowerCase();
                const productName = entity.product.name.toLowerCase();

                if (selectedFilter === 'active') {
                  return entity.isActive && productName.includes(lowerValue);
                } else {
                  return !entity.isActive && productName.includes(lowerValue);
                }
              }}
              searchPlaceholder="İlan Ara"
              data={adverts?.list || []}
              renderItem={(item: any) => {
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
    </Page>
  );
}
const FilterContainer = styled(View)`
  gap: 10px;
  flex-direction: row;
  margin-bottom: 10px;
`;
