import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/Button/Button';
import MainHeader from '../components/Header/MainHeader';
import ProductCard from '../components/Product/ProductCard';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faEnvelope, faFilter} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';

import {categoryApi} from '../services/categoryService';
import Container from '../components/Container/Container';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import {Col, Row} from '../constant/GlobalStyled';
import CustomText from '../components/Text/Text';

export default function HomeScreen(props: any) {
  const products = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 1',
      productName: 'Ürün Adı 1',
      price: '₺100',
    },
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 1',
      productName: 'Ürün Adı 1',
      price: '₺100',
    },
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 1',
      productName: 'Ürün Adı 1',
      price: '₺100',
    },
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 1',
      productName: 'Ürün Adı 1',
      price: '₺100',
    },
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 1',
      productName: 'Ürün Adı 1',
      price: '₺100',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 2',
      productName: 'Ürün Adı 2',
      price: '₺200',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 3',
      productName: 'Ürün Adı 3',
      price: '₺300',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 4',
      productName: 'Ürün Adı 4',
      price: '₺400',
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 5',
      productName: 'Ürün Adı 5',
      price: '₺500',
    },
    {
      id: '6',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 6',
      productName: 'Ürün Adı 6',
      price: '₺600',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 4',
      productName: 'Ürün Adı 4',
      price: '₺400',
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/150',
      categoryName: 'Kategori Adı 5',
      productName: 'Ürün Adı 5',
      price: '₺500',
    },
  ];

  const {data: categories} = categoryApi.useGetCategoriesQuery();
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const productSheetRef = useRef<BottomSheetRef>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <Page isSearchable header title="İlanlarım" showMessage showNotification>
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
                {categories?.list
                  .filter(x => x.parentCategoryId == 0)
                  .map((category, index) => {
                    return (
                      <Button
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
              <FontAwesomeIcon icon={faFilter} size={24} color="#333" />
            </FilterIconContainer>
          </HeaderRow>

          <ProductList
            data={products}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: {item: any}) => (
              <ProductCard
                onPress={() => productSheetRef.current?.open()}
                image={item.image}
                categoryName={item.categoryName}
                productName={item.productName}
                price={item.price}
              />
            )}
            numColumns={3}
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
      <CustomBottomSheet ref={productSheetRef} snapPoints={['50%']}>
        <Container m={5} flex={0.3} bgColor="white">
          <Row gap={10}>
            <AccountProfile></AccountProfile>
            <Col gap={12}>
              <CustomText color="black" fontSizes="body4">
                Ürün Adı
              </CustomText>
              <CustomText color="black" fontSizes="body6">
                Kategori
              </CustomText>
              <CustomText color="black" fontSizes="body6">
                Stok Miktarı
              </CustomText>
              <CustomText color="black" fontSizes="body5">
                Fiyat
              </CustomText>
            </Col>
          </Row>
        </Container>
        <Container flex={0.7} m={14}>
          <Col gap={10}>
            <CustomText color="black" fontSizes="body3" fontWeight="bold">
              Ürün Açıklaması
            </CustomText>
            <CustomText color="black" fontSizes="body5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown. Lorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when
              an unknown. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown
            </CustomText>
            <Button style={{marginTop: 20}} text="MESAJ GÖNDER"></Button>
          </Col>
        </Container>
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
  margin-horizontal: 15px;
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

const ProductList = styled(FlatList)`
  background-color: #f0f0f0;
`;
const AccountProfile = styled(View)`
  height: 100px;
  width: 100px;
  background-color: red;
  margin-left: 10px;
`;
