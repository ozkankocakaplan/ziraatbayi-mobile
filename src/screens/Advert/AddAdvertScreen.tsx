import React, {useRef, useState} from 'react';
import Page from '../../components/Page/Page';
import {FormContainerRef} from 'react-native-form-container';
import Input from '../../components/Input/Input';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import {AdvertApi} from '../../services/advertService';
import CreateAdvertRequest from '../../payload/request/CreateAdvertRequest';
import {BottomSheetRef} from '../../components/BottomSheet/CustomBottomSheet';
import Button from '../../components/Button/Button';
import CalendarModal from '../../components/CalendarModal/CalendarModal';
import CategoryBottomSheet from '../../components/Advert/CategoryBottomSheet';
import ProductBottomSheet from '../../components/Advert/ProductBottomSheet';
import ProductResponse from '../../payload/response/ProductResponse';
import CategoryResponse from '../../payload/response/CategoryResponse';
import {checkObject, formatDate} from '../../helper/Helper';
import Container from '../../components/Container/Container';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import dayjs from 'dayjs';
import useThemeColors from '../../constant/useColor';

export default function AddAdvertScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const colors = useThemeColors();
  const [useCreateAdvert] = AdvertApi.useCreateAdvertMutation();
  const [selectedProduct, setSelectedProduct] = useState({} as ProductResponse);
  const [selectedCategory, setSelectedCategory] = useState(
    {} as CategoryResponse,
  );
  const [advertRequest, setAdvertRequest] = useState<CreateAdvertRequest>({
    productId: 0,
    stockQuantity: '',
    startDate: '',
    expiryDate: '',
    minOrderQuantity: '',
  });
  const categoryBottomSheetRef = useRef<BottomSheetRef>(null);
  const productBottomSheetRef = useRef<BottomSheetRef>(null);
  const [activeInput, setActiveInput] = useState<
    'productionDate' | 'expirationDate' | null
  >(null);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleChangeAdvertRequest = (
    key: keyof CreateAdvertRequest,
    value: any,
  ) => {
    setAdvertRequest({...advertRequest, [key]: value});
    if (key === 'expiryDate' || key === 'startDate') {
      setIsCalendarVisible(false);
    }
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
      let result = await useCreateAdvert({
        ...advertRequest,
        stockQuantity: parseInt(advertRequest.stockQuantity),
        minOrderQuantity: parseInt(advertRequest.minOrderQuantity),
      });

      if (result.data?.isSuccessful) {
        AlertDialog.showModal({
          disableCloseOnTouchOutside: true,
          type: 'success',
          message: 'İlanınız başarıyla oluşturuldu.',
          onConfirm() {
            navigation.goBack();
          },
        });
      } else {
        let exceptionMessage = (result.error as any)?.data?.exceptionMessage;
        AlertDialog.showModal({
          type: 'warning',
          message: exceptionMessage || 'Bir hata oluştu.',
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
        <Container mx={10} mt={10}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{gap: 10}}>
            <Input
              handlePress={() => {
                categoryBottomSheetRef.current?.open();
              }}
              isPlaceholder={true}
              required
              id="category"
              placeholderValue={
                selectedCategory?.id
                  ? selectedCategory.name
                  : 'Kategori Seçiniz'
              }
              color={
                selectedCategory?.id ? colors.black : colors.inputPlaceholder
              }
            />
            <Input
              handlePress={() => {
                if (selectedCategory.id) {
                  productBottomSheetRef.current?.open();
                }
              }}
              isPlaceholder={true}
              placeholderValue={
                advertRequest.productId == 0
                  ? 'Ürün Seçiniz'
                  : selectedProduct.name
              }
              required
              id="productName"
              color={
                selectedProduct.name ? colors.black : colors.inputPlaceholder
              }
            />
            <Input
              required
              id="stockQuantity"
              placeholder="Stok Miktarı"
              keyboardType="number-pad"
              value={advertRequest.stockQuantity.toString()}
              onChangeText={text => {
                handleChangeAdvertRequest('stockQuantity', text);
              }}
            />
            <Input
              required
              id="orderQuantity"
              placeholder="Minimum Sipariş Miktarı"
              keyboardType="number-pad"
              value={advertRequest.minOrderQuantity?.toString()}
              onChangeText={text => {
                handleChangeAdvertRequest('minOrderQuantity', text);
              }}
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
              color={
                advertRequest.startDate ? colors.black : colors.inputPlaceholder
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
              color={
                advertRequest.expiryDate
                  ? colors.black
                  : colors.inputPlaceholder
              }
            />
          </ScrollView>
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
        minDate={
          advertRequest.startDate && advertRequest?.startDate.length > 0
            ? advertRequest.startDate
            : activeInput === 'productionDate'
            ? undefined
            : dayjs().format('YYYY-MM-DD')
        }
        expirationDate={advertRequest.expiryDate}
        productionDate={advertRequest.startDate || ''}
        handleDateChange={day => {
          console.log(day);
          activeInput === 'productionDate'
            ? handleChangeAdvertRequest('startDate', day.dateString)
            : handleChangeAdvertRequest('expiryDate', day.dateString);
        }}
      />
      <CategoryBottomSheet
        bottomSheetRef={categoryBottomSheetRef}
        checked={selectedCategory}
        handleChecked={item => {
          console.log(item);
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
