import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Row} from '../constant/GlobalStyled';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import styled from 'styled-components';
import CategoryResponse from '../payload/response/CategoryResponse';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import Page from '../components/Page/Page';
import Icon from '../components/Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {CategoryApi} from '../services/categoryService';
export default function CategoriesScreen(
  props: NativeStackScreenProps<RootStackParamList, 'CategoriesScreen'>,
) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse>(
    props.route.params.initCategory ?? ({} as CategoryResponse),
  );
  const selected = props.route.params.selectedCategory;
  const previousSelected = props.route.params.previousCategory;
  const {data: categories, refetch: refetchCategories} =
    CategoryApi.useGetCategoriesQuery(true);
  const {navigation} = props;
  useEffect(() => {
    navigation.addListener('focus', () => {
      refetchCategories();
    });
  }, []);

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
          borderBottom={true}
          borderLeft={categoryType !== 'right' ? 5 : 0}
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
            fontSizes="body5"
            color="primary">
            {el.name}
          </CustomText>
          <Icon icon={faAngleRight} color="#1F8505" size={20} />
        </CategoryButton>
      );
    });
  };

  return (
    <Page header title={'Kategoriler'} showGoBack>
      <Container>
        <Row>
          <Container flex={1} bgColor="#F5F5F5">
            {previousSelected
              ? recuversiveCategory(previousSelected, undefined, 'left')
              : categories?.list
                  .filter(x => x.parentCategoryId == 0)
                  .map((el, index) => {
                    return (
                      <CategoryButton
                        key={el.id}
                        borderLeft={el.id === selectedCategory.id ? 5 : 0}
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
                          fontSizes="body5"
                          color="primary">
                          {el.name}
                        </CustomText>
                        <Icon icon={faAngleRight} color="#1F8505" size={20} />
                      </CategoryButton>
                    );
                  })}
          </Container>
          <Container bgColor="#fff">
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
              recuversiveCategory(selectedCategory, false)
            ) : (
              recuversiveCategory(selectedCategories, true)
            )}
          </Container>
        </Row>
      </Container>
    </Page>
  );
}
const CategoryButton = styled(TouchableOpacity)<{
  isSelected?: boolean;
  borderLeft?: number;
  borderBottom?: boolean;
}>`
  padding-vertical: 10px;
  height: 50px;
  background-color: ${props => (props.isSelected ? '#fff' : '#F5F5F5')};
  padding-horizontal: 18px;
  justify-content: space-between;
  align-items: center;
  border-left-width: ${props => props.borderLeft}px;
  flex-direction: row;
  border-left-color: ${props => (props.isSelected ? '#4AAF55' : '#fff')};
  border-bottom-width: ${props => (props.borderBottom ? 1 : 0)}px;
  border-bottom-color: #ebeff3;
`;
