import React, {useRef} from 'react';
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
import {faBars, faFilter} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';

export default function HomeScreen() {
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
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  return (
    <>
      <MainHeader screen="HomeScreen" />
      <Container>
        <HeaderRow>
          {/* Boyutu ayarla */}
          <ButtonContainer>
            <FontAwesomeIcon icon={faBars} size={16} color="black" />
            <ButtonText>Kategoriler</ButtonText>
          </ButtonContainer>
          <CategoriesScroll horizontal showsHorizontalScrollIndicator={false}>
            <CategoriesContainer>
              <Button text="Kategori 2" />
              <Button text="Kategori 3" />
              <Button text="Kategori 4" />
            </CategoriesContainer>
          </CategoriesScroll>

          <FilterIconContainer>
            <FontAwesomeIcon icon={faFilter} size={24} color="black" />
          </FilterIconContainer>
        </HeaderRow>

        <ProductList
          data={products}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: {item: any}) => (
            <ProductCard
              image={item.image}
              categoryName={item.categoryName}
              productName={item.productName}
              price={item.price}
            />
          )}
          numColumns={3}
        />
        <CustomBottomSheet
          snapPoints={['80%']}
          ref={bottomSheetRef}></CustomBottomSheet>
      </Container>
    </>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #f0f0f0;
`;

const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 8px;
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
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
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
`;

const ProductList = styled(FlatList)`
  background-color: #f0f0f0;
`;
