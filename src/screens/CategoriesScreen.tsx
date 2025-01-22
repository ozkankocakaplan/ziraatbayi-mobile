import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Row} from '../constant/GlobalStyled';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import styled from 'styled-components';
import CategoryResponse from '../payload/response/CategoryResponse';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import Icon from '../components/Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {CategoryApi} from '../services/categoryService';
import CustomNotFound from '../components/CustomNotFound/CustomNotFound';

import CustomFlatList from '../components/Flatlist/CustomFlatList';
export default function CategoriesScreen(
  props: NativeStackScreenProps<RootStackParamList, 'CategoriesScreen'>,
) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse>(
    props.route.params.initCategory ?? ({} as CategoryResponse),
  );
  const selected = props.route.params.selectedCategory;
  const previousSelected = props.route.params.previousCategory;
  const {
    data: categories,
    refetch: refetchCategories,
    isLoading,
    isFetching,
    isUninitialized,
  } = CategoryApi.useGetCategoriesQuery(true);
  const {navigation} = props;

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (!isLoading && !isFetching && !isUninitialized) {
        refetchCategories();
      }
    });
  }, [navigation, refetchCategories, isLoading, isFetching, isUninitialized]);

  useEffect(() => {
    if (
      categories?.list &&
      !selected &&
      !previousSelected &&
      !props.route.params.initCategory
    ) {
      if (categories?.list[0]?.children.length != 0) {
        setSelectedCategory(categories?.list[0]);
      }
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
  const goToProductPage = (category: CategoryResponse) => {
    navigation.push('AdvertsByCategoryScreen', {
      category: category,
    });
  };
  const recuversiveCategory = (
    data?: CategoryResponse,
    isSelected?: boolean,
    categoryType?: 'left' | 'right',
  ) => {
    categoryType = categoryType ?? 'right';

    return (
      <CustomFlatList
        data={data?.children}
        renderItem={(item: CategoryResponse) => {
          return (
            <CategoryButton
              key={item.id}
              borderBottom={true}
              borderLeft={categoryType !== 'right' ? 5 : 0}
              onPress={() => {
                if (categoryType == 'right') {
                  if (item.children.length != 0) {
                    props.navigation.push('CategoriesScreen', {
                      selectedCategory: item,
                      previousCategory: selectedCategory,
                    });
                  } else {
                    goToProductPage(item);
                  }
                } else {
                  setSelectedCategory(item);
                }
              }}
              isSelected={selectedCategory.id == item.id || isSelected}>
              <CustomText
                numberOfLines={2}
                fontWeight={item.id === selectedCategory.id ? 'bold' : 'normal'}
                fontSizes="body6"
                color="primary">
                {item.name}
              </CustomText>
              <Icon icon={faAngleRight} color="#1F8505" size={20} />
            </CategoryButton>
          );
        }}
      />
    );
  };
  const isLoadingCategories = isLoading || isFetching;
  return (
    <Page header title={'Kategoriler'} showGoBack>
      {categories?.list.length == 0 && !isLoadingCategories ? (
        <CustomNotFound notFoundText="Kategori bulunamadı." />
      ) : (
        <Row flex={1}>
          <Container flex={1} bgColor="#F5F5F5">
            {previousSelected ? (
              recuversiveCategory(previousSelected, undefined, 'left')
            ) : (
              <CustomFlatList
                scrollEnabled={false}
                data={categories?.list.filter(x => x.parentCategoryId == 0)}
                renderItem={(item: CategoryResponse) => {
                  return (
                    <CategoryButton
                      key={item.id}
                      borderLeft={item.id === selectedCategory.id ? 5 : 0}
                      isSelected={item.id === selectedCategory.id}
                      onPress={() => {
                        if (item.children.length != 0) {
                          setSelectedCategory(item);
                        } else {
                          goToProductPage(item);
                        }
                      }}>
                      <CustomText
                        numberOfLines={2}
                        fontWeight={
                          item.id === selectedCategory.id ? 'bold' : 'normal'
                        }
                        fontSizes="body5"
                        color="primary">
                        {item.name}
                      </CustomText>
                      <Icon icon={faAngleRight} color="#1F8505" size={20} />
                    </CategoryButton>
                  );
                }}
              />
            )}
          </Container>
          <Container bgColor="#fff" flex={1}>
            {selectedCategory && selectedCategories?.children.length == 0 ? (
              <CategoryButton
                id=""
                onPress={() => {
                  goToProductPage(selectedCategories);
                }}
                isSelected={true}>
                <CustomText
                  numberOfLines={2}
                  fontWeight="bold"
                  fontSizes="body3"
                  color="default">
                  {selectedCategories.name}
                </CustomText>
              </CategoryButton>
            ) : selected ? (
              recuversiveCategory(selectedCategory, false)
            ) : (
              recuversiveCategory(selectedCategories, true)
            )}
          </Container>
        </Row>
      )}
    </Page>
  );
}
const CategoryButton = styled(TouchableOpacity)<{
  isSelected?: boolean;
  borderLeft?: number;
  borderBottom?: boolean;
}>`
  padding-vertical: 10px;
  height: 55px;
  background-color: ${props => (props.isSelected ? '#fff' : '#F5F5F5')};
  padding-left: 10px;
  padding-right: 15px;
  justify-content: space-between;
  align-items: center;
  border-left-width: ${props => props.borderLeft}px;
  flex-direction: row;
  border-left-color: ${props => (props.isSelected ? '#4AAF55' : '#fff')};
  border-bottom-width: ${props => (props.borderBottom ? 1 : 0)}px;
  border-bottom-color: #ebeff3;
`;
