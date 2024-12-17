import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {AdvertApi} from '../services/advertService';
import CreateAdvertRequest from '../payload/request/CreateAdvertRequest';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import Button from '../components/Button/Button';
import CheckRadio from '../components/CheckInput/CheckRadio';
import CalendarModal from '../components/CalendarModal/CalendarModal';
import dayjs from 'dayjs';
import CategorySelection from '../components/Advert/CategoryBottomSheet';
import CategoryBottomSheet from '../components/Advert/CategoryBottomSheet';
import ProductBottomSheet from '../components/Advert/ProductBottomSheet';
import ProductResponse from '../payload/response/ProductResponse';
import CategoryResponse from '../payload/response/CategoryResponse';
import {checkObject, formatDate} from '../helper/Helper';
import Container from '../components/Container/Container';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function AddAdvertScreen(
  props: NativeStackScreenProps<RootStackParamList, 'AddAdvertScreen'>,
) {
  var ref = useRef<FormContainerRef>(null);
  const [useCreateAdvert] = AdvertApi.useCreateAdvertMutation();
  const [selectedProduct, setSelectedProduct] = useState({} as ProductResponse);
  const [selectedCategory, setSelectedCategory] = useState(
    {} as CategoryResponse,
  );
  const [advertRequest, setAdvertRequest] = useState<CreateAdvertRequest>({
    productId: 0,
    stockQuantity: 1,
    startDate: '',
    expiryDate: '',
    minOrderQuantity: 1,
  });
  const categoryBottomSheetRef = useRef<BottomSheetRef>(null);
  const productBottomSheetRef = useRef<BottomSheetRef>(null);
  const [activeInput, setActiveInput] = useState<
    'productionDate' | 'expirationDate' | null
  >(null);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleExpirationDateChange = (day: any) => {
    setAdvertRequest({...advertRequest, expiryDate: day.dateString});
    setIsCalendarVisible(false);
  };

  const handleProductionDateChange = (day: any) => {
    setAdvertRequest({...advertRequest, startDate: day.dateString});
    setIsCalendarVisible(false);
  };

  const checkRequestForm = () => {
    let form = {
      productId:
        advertRequest.productId == 0 ? '' : advertRequest.productId.toString(),
      categoryId:
        Object.keys(selectedCategory).length == 0
          ? ''
          : selectedCategory.id.toString(),
      stockQuantity:
        advertRequest.stockQuantity == 0
          ? ''
          : advertRequest.stockQuantity.toString(),
      minOrderQuantity:
        advertRequest.minOrderQuantity == 0
          ? ''
          : advertRequest?.minOrderQuantity?.toString() || '',
      expiryDate: advertRequest.expiryDate,
    };
    return checkObject(form);
  };
  const handleSave = async () => {
    try {
      let result = await useCreateAdvert(advertRequest);
      console.log(result);
      if (result.data?.isSuccessful) {
        AlertDialog.showModal({
          type: 'success',
          title: 'İlanınız Oluşturuldu',
          message: 'İlanınız başarıyla yayına alınmıştır.',
        });
      }
    } catch (error) {
      AlertDialog.showModal({
        type: 'error',
        title: 'İlanınız oluşturulamadı',
        message: 'İlanınız oluşturulamadı tekrar deneyiniz',
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
      behavior={'padding'}>
      <Page header showGoBack title="İlan Ekle">
        <Container mx={10} mt={10} gap={10}>
          <Input
            handlePress={() => {
              categoryBottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            required
            id="category"
            placeholderValue={
              selectedCategory ? selectedCategory.name : 'Kategori Seç'
            }
          />
          <Input
            handlePress={() => {
              productBottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            placeholderValue={
              advertRequest.productId == 0 ? 'Ürün Seç' : selectedProduct.name
            }
            required
            id="productName"
          />
          <Input
            required
            id="stockQuantity"
            placeholder="Stok Miktarı"
            keyboardType="number-pad"
          />
          <Input
            required
            id="orderQuantity"
            placeholder="Minimum Sipariş Miktarı"
            keyboardType="number-pad"
          />

          <Input
            handlePress={() => {
              setActiveInput('productionDate');
              setIsCalendarVisible(true);
            }}
            isPlaceholder={true}
            required
            id="productionDate"
            placeholderValue={
              advertRequest.startDate && advertRequest?.startDate?.length > 0
                ? formatDate(advertRequest.startDate)
                : 'Üretim Tarihi'
            }
          />
          <Input
            handlePress={() => {
              setActiveInput('expirationDate');
              setIsCalendarVisible(true);
            }}
            isPlaceholder={true}
            required
            id="expirationDate"
            placeholderValue={
              advertRequest.expiryDate.length > 0
                ? formatDate(advertRequest.expiryDate)
                : 'Son Kullanma Tarihi'
            }
          />
        </Container>
        <Container mx={10} flex={0.15}>
          <Button
            onPress={handleSave}
            isDisabled={checkRequestForm()}
            text="KAYDET"></Button>
        </Container>
      </Page>

      <CalendarModal
        isCalendarVisible={isCalendarVisible}
        setIsCalendarVisible={value => {
          setIsCalendarVisible(value);
        }}
        expirationDate={advertRequest.expiryDate}
        productionDate={advertRequest.startDate || ''}
        handleDateChange={
          activeInput === 'productionDate'
            ? handleProductionDateChange
            : handleExpirationDateChange
        }
      />
      <CategoryBottomSheet
        bottomSheetRef={categoryBottomSheetRef}
        checked={selectedCategory}
        handleChecked={item => {
          if (item) {
            setSelectedCategory(item);
          } else {
            setSelectedCategory({} as CategoryResponse);
          }
        }}
      />
      <ProductBottomSheet
        bottomSheetRef={productBottomSheetRef}
        categoryId={selectedCategory.id}
        checked={selectedProduct}
        handleChecked={item => {
          if (item) {
            setSelectedProduct(item);
          } else {
            setSelectedProduct({} as ProductResponse);
          }
          setAdvertRequest({...advertRequest, productId: item?.id || 0});
        }}
      />
    </KeyboardAvoidingView>
  );
}
