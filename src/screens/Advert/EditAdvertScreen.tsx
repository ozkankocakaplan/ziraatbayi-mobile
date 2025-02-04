import React, {useEffect, useRef, useState} from 'react';
import Page from '../../components/Page/Page';
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
import UpdateAdvertRequest from '../../payload/request/UpdateAdvertRequest';
import CheckInput from '../../components/CheckInput/CheckInput';
import useThemeColors from '../../constant/useColor';

export default function EditAdvertScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'EditAdvertScreen'>) {
  const colors = useThemeColors();
  const categoryBottomSheetRef = useRef<BottomSheetRef>(null);
  const productBottomSheetRef = useRef<BottomSheetRef>(null);
  const advertId = route.params.id;
  const [getAdvert] = AdvertApi.useGetAdvertByIdMutation();
  const [useUpdateAdvert] = AdvertApi.useUpdateAdvertMutation();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<
    'productionDate' | 'expirationDate' | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState({} as ProductResponse);
  const [selectedCategory, setSelectedCategory] = useState(
    {} as CategoryResponse,
  );
  const [advertRequest, setAdvertRequest] = useState<UpdateAdvertRequest>(
    {} as UpdateAdvertRequest,
  );

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadAdvert();
    });
  }, []);

  const loadAdvert = async () => {
    const {data} = await getAdvert(advertId);
    if (data?.isSuccessful) {
      let request = {
        id: advertId,
        productId: data.entity.product.id,
        startDate:
          data.entity.startDate != null
            ? dayjs(data.entity.startDate).format('YYYY-MM-DD')
            : '',
        expiryDate:
          data.entity.expiryDate != null
            ? dayjs(data.entity.expiryDate).format('YYYY-MM-DD')
            : '',
        isActive: data.entity.isActive,
      } as UpdateAdvertRequest;
      let categoryResponse = {
        id: data.entity.product.categoryId,
        name: data.entity.product.categoryName,
      } as CategoryResponse;
      let productResponse = {
        ...data.entity.product,
      };
      setSelectedCategory(categoryResponse);
      setSelectedProduct(productResponse);
      setAdvertRequest(request);
    }
  };
  console.log(advertRequest);
  const handleChangeAdvertRequest = (
    key: keyof UpdateAdvertRequest,
    value: any,
  ) => {
    if (activeInput === 'productionDate') {
      let expiryDateValue = '';
      if (advertRequest.expiryDate && advertRequest.expiryDate.length > 0) {
        let isAfter = dayjs(value).isAfter(advertRequest.expiryDate);
        expiryDateValue = !isAfter ? advertRequest.expiryDate : '';
      }
      setAdvertRequest({
        ...advertRequest,
        startDate: value,
        expiryDate: expiryDateValue,
      });
    } else {
      setAdvertRequest({
        ...advertRequest,
        [key]: advertRequest[key] === value ? '' : value,
      });
    }

    if (key === 'expiryDate' || key === 'startDate') {
      setIsCalendarVisible(false);
    }
  };

  const checkRequestForm = () => {
    let form = {
      productId:
        advertRequest?.productId == 0
          ? ''
          : advertRequest?.productId?.toString(),
      categoryId:
        Object.keys(selectedCategory).length == 0
          ? ''
          : selectedCategory?.id.toString(),

      expiryDate: advertRequest.expiryDate,
    };
    return checkObject(form);
  };
  const handleSave = async () => {
    try {
      let result = await useUpdateAdvert({
        ...advertRequest,
      });

      if (result.data?.isSuccessful) {
        SaveSuccesMessage();
      } else {
        SaveErrorMessage();
      }
    } catch (error) {
      SaveErrorMessage();
    }
  };
  const SaveErrorMessage = () => {
    AlertDialog.showModal({
      type: 'error',
      message: 'İlanınız oluşturulamadı lütfen tekrar deneyiniz.',
    });
  };
  const SaveSuccesMessage = () => {
    AlertDialog.showModal({
      disableCloseOnTouchOutside: true,
      type: 'success',
      message: 'İlanınız başarıyla güncellenmiştir.',
      onConfirm() {
        navigation.goBack();
      },
    });
  };
  const [deleteAdvert] = AdvertApi.useDeleteAdvertMutation();
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
      behavior={'padding'}>
      <Page
        header
        showGoBack
        title="İlan Düzenle"
        handleDelete={() => {
          AlertDialog.showModal({
            message: 'Bu ilanı silmek istediğinizden emin misiniz?',
            onConfirm: async () => {
              try {
                const result = await deleteAdvert(advertId);
                if (result.data?.isSuccessful) {
                  AlertDialog.showModal({
                    type: 'success',
                    message: 'İlan başarıyla silindi.',
                    onConfirm: () => navigation.goBack(),
                  });
                } else {
                  AlertDialog.showModal({
                    type: 'error',

                    message:
                      'İlan silinirken bir hata oluştu. Lütfen tekrar deneyin.',
                  });
                }
              } catch (error) {
                AlertDialog.showModal({
                  type: 'error',

                  message: 'Bir hata meydana geldi. Lütfen tekrar deneyin.',
                });
              }
            },
            onCancel: () => {},
          });
        }}>
        <Container mx={10} mt={10}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{gap: 10}}>
            <Input
              title="Kategori Adı"
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
              title="Ürün Adı"
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
              color={
                selectedProduct.name ? colors.black : colors.inputPlaceholder
              }
              required
              id="productName"
            />

            <Input
              title="Üretim Tarihi"
              handlePress={() => {
                setActiveInput('productionDate');
                setIsCalendarVisible(true);
              }}
              isPlaceholder={true}
              required
              id="productionDate"
              placeholderValue={
                advertRequest?.startDate && advertRequest?.startDate?.length > 0
                  ? formatDate(advertRequest.startDate)
                  : 'Üretim Tarihini Seçiniz'
              }
              color={
                advertRequest.startDate ? colors.black : colors.inputPlaceholder
              }
            />
            <Input
              title="Son Kullanma Tarihi"
              handlePress={() => {
                setActiveInput('expirationDate');
                setIsCalendarVisible(true);
              }}
              isPlaceholder={true}
              required
              id="expirationDate"
              placeholderValue={
                advertRequest?.expiryDate?.length > 0
                  ? formatDate(advertRequest.expiryDate)
                  : 'Son Kullanma Tarihini Seçiniz'
              }
              color={
                advertRequest.expiryDate
                  ? colors.black
                  : colors.inputPlaceholder
              }
            />

            <CheckInput
              fontWeight="bold"
              bgColor="white"
              value={advertRequest.isActive}
              onPress={() => {
                handleChangeAdvertRequest('isActive', !advertRequest.isActive);
              }}
              clickLabel={() => {
                handleChangeAdvertRequest('isActive', !advertRequest.isActive);
              }}
              label="İlanı Aktif Et"
            />
          </ScrollView>
        </Container>

        <Container mx={10} flex={0.15}>
          <Button
            onPress={handleSave}
            isDisabled={checkRequestForm()}
            text="KAYDET"></Button>
        </Container>
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
          selectedDate={
            activeInput === 'productionDate'
              ? advertRequest.startDate
              : advertRequest.expiryDate
          }
          handleDateChange={day => {
            activeInput === 'productionDate'
              ? handleChangeAdvertRequest('startDate', day.dateString)
              : handleChangeAdvertRequest('expiryDate', day.dateString);
          }}
        />
      </Page>

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
