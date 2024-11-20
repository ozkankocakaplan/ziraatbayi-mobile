import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import Button from '../components/Button/Button';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import Container from '../components/Container/Container';
import MainHeader from '../components/Header/MainHeader';
import ProductCard from '../components/Product/ProductCard';
import styled from 'styled-components';

export default function HomeScreen() {
  // const dispatch = useDispatch();

  // const logOut = () => {
  //   dispatch(AuthActions.setUser(null));
  // };

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

  return (
    <>
      <MainHeader />

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
        numColumns={3} // 3 kart aynı satırda olacak şekilde düzenle
        contentContainerStyle={{paddingBottom: 20}} // Aşağı kaydırma için boşluk bırak
      />
    </>
  );
}

const ProductList = styled(FlatList)`
  background-color: #f0f0f0;
`;
