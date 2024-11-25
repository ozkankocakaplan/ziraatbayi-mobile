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
import Container from '../components/Container/Container';
import {categoryApi} from '../services/categoryService';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
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
  const [getCategories] = categoryApi.useGetCategoriesMutation();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const fetchCategories = async () => {
      try {
        const response = await getCategories().unwrap();
        console.log('Categories:', response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const loadAdverts = () => {
    // Load adverts
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const productSheetRef = useRef<BottomSheetRef>(null);
  return (
    <>
      <Container
        isSearchable
        header
        title="İlanlarıms"
        showMessage
        showNotification>
        <Container type="container" isLoading={isLoading}>
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

            <FilterIconContainer
              onPress={() => {
                bottomSheetRef.current?.open();
              }}>
              <FontAwesomeIcon icon={faFilter} size={24} color="black" />
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
      </Container>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 16}}>Alt bilgi içeriği buraya gelecek.</Text>
          <TouchableOpacity onPress={closeBottomSheet} style={{marginTop: 20}}>
            <Text style={{color: 'blue'}}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
      <CustomBottomSheet ref={productSheetRef} snapPoints={['50%']}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 16}}>Ürün bilgi içeriği buraya gelecek.</Text>
          <TouchableOpacity
            onPress={() => {
              productSheetRef.current?.close();
            }}
            style={{marginTop: 20}}>
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
