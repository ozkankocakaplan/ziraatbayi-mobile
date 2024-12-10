import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Row, ColBackground, Flex} from '../constant/GlobalStyled';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import styled from 'styled-components';
import {categoryApi} from '../services/categoryService';
import CategoryResponse from '../payload/response/CategoryResponse';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import Page from '../components/Page/Page';
export default function CategoriesScreen(
  props: NativeStackScreenProps<RootStackParamList, 'CategoriesScreen'>,
) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse>(
    props.route.params.initCategory ?? ({} as CategoryResponse),
  );
  const selected = props.route.params.selectedCategory;
  const previousSelected = props.route.params.previousCategory;
  const {data: categories} = categoryApi.useGetCategoriesQuery();

  useEffect(() => {
    if (
      categories?.list &&
      !selected &&
      !previousSelected &&
      !props.route.params.initCategory
    ) {
      setSelectedCategory(categories?.list[0]);
    }
  }, [categories]);
  useEffect(() => {
    if (selected) {
      setSelectedCategory(selected);
    }
  }, [selected]);
  const selectedCategories = categories?.list.find(
    x => x.id == selectedCategory.id,
  );
  const goToProductPage = () => {
    AlertDialog.showModal({
      message: 'Ürün sayfasına git',
    });
  };
  const recuversiveCategory = (
    data?: CategoryResponse,
    isSelected?: boolean,
    categoryType?: 'left' | 'right',
  ) => {
    categoryType = categoryType ?? 'right';
    return data?.children?.map?.((el: CategoryResponse) => {
      return (
        <CategoryButton
          key={el.id}
          onPress={() => {
            if (categoryType == 'right') {
              if (el.children.length != 0) {
                props.navigation.push('CategoriesScreen', {
                  selectedCategory: el,
                  previousCategory: selectedCategory,
                });
              } else {
                goToProductPage();
              }
            } else {
              setSelectedCategory(el);
            }
          }}
          isSelected={selectedCategory.id == el.id || isSelected}>
          <CustomText
            fontWeight={el.id === selectedCategory.id ? 'bold' : 'normal'}
            fontSizes="body4"
            color="primary">
            {el.name}
          </CustomText>
        </CategoryButton>
      );
    });
  };

  return (
    <Page header title={'Kategoriler'} showGoBack>
      <Container>
        <Row>
          <Container flex={0.6} bgColor="#E9EED9">
            {previousSelected
              ? recuversiveCategory(previousSelected, undefined, 'left')
              : categories?.list
                  .filter(x => x.parentCategoryId == 0)
                  .map((el, index) => {
                    return (
                      <CategoryButton
                        key={el.id}
                        isSelected={el.id === selectedCategory.id}
                        onPress={() => {
                          if (el.children.length != 0) {
                            setSelectedCategory(el);
                          } else {
                            goToProductPage();
                          }
                        }}>
                        <CustomText
                          fontWeight={
                            el.id === selectedCategory.id ? 'bold' : 'normal'
                          }
                          fontSizes="body3"
                          color="primary">
                          {el.name}
                        </CustomText>
                      </CategoryButton>
                    );
                  })}
          </Container>
          <Container>
            {selectedCategory && selectedCategories?.children.length == 0 ? (
              <CategoryButton
                onPress={() => {
                  goToProductPage();
                }}
                isSelected={true}>
                <CustomText fontWeight="bold" fontSizes="body3" color="default">
                  {selectedCategories.name}
                </CustomText>
              </CategoryButton>
            ) : selected ? (
              recuversiveCategory(selectedCategory, true)
            ) : (
              recuversiveCategory(selectedCategories, true)
            )}
          </Container>
        </Row>
      </Container>
    </Page>
  );
}
const CategoryButton = styled(TouchableOpacity)<{isSelected?: boolean}>`
  padding-vertical: 10px;
  height: 50px;
  background-color: ${props => (props.isSelected ? '#f9f9f9' : '#D0F5D5')};
  padding-horizontal: 18px;
  justify-content: center;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.isSelected ? 'black' : '#B4B4B8')};
`;
