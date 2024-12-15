import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {ScrollView, View} from 'react-native';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import CheckRadio from '../components/CheckInput/CheckRadio';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import CalendarModal from '../components/CalendarModal/CalendarModal';
import dayjs from 'dayjs';

const family = ['Feriza', 'Özkan'];
export default function EditAdvertScreen() {
  var ref = useRef<FormContainerRef>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const handleDelete = () => {
    AlertDialog.showModal({
      title: 'İlanı Sil',
      message: 'İlanı silmek istediğinize emin misiniz?',
      onCancel() {},
      onConfirm() {},
    });
  };
  const [activeInput, setActiveInput] = useState<
    'productionDate' | 'expirationDate' | null
  >(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [productionDate, setProductionDate] = useState('');

  const handleExpirationDateChange = (day: any) => {
    const formattedDate = formatDate(day.dateString);
    setExpirationDate(formattedDate);
    setIsCalendarVisible(false);
  };

  const handleProductionDateChange = (day: any) => {
    const formattedDate = formatDate(day.dateString);
    setProductionDate(formattedDate);
    setIsCalendarVisible(false);
  };
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD.MM.YYYY');
  };
  return (
    <>
      <Page
        header
        showGoBack
        title="İlan Düzenle"
        handleDelete={() => {
          handleDelete();
        }}>
        <Form formContainerRef={ref}>
          <Input
            handlePress={() => {
              bottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            required
            id="category"
            placeholderValue={selectedFamily ? selectedFamily : 'Kategori Seç'}
          />
          <Input
            handlePress={() => {
              bottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            placeholderValue="Ürün Seç"
            required
            id="productName"
          />
          <Input
            handlePress={() => {
              bottomSheetRef.current?.open();
            }}
            isPlaceholder={true}
            placeholderValue="Etken Madde"
            required
            id="activeSubstance"
          />
          <Input required id="stockQuantity" placeholder="Stok Miktarı" />
          <Input
            required
            id="orderQuantity"
            placeholder="Minimum Sipariş Miktarı"
          />

          <Input
            handlePress={() => {
              setActiveInput('productionDate');
              setIsCalendarVisible(true);
            }}
            isPlaceholder={true}
            required
            id="productionDate"
            placeholderValue={productionDate ? productionDate : 'Üretim Tarihi'}
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
              expirationDate ? expirationDate : 'Son Kullanma Tarihi'
            }
          />
          <CustomText sx={{marginTop: 16, marginLeft: 10}} color="black">
            İlan durumu
          </CustomText>
          <RegisterContainer>
            <Button text="GÜNCELLE"></Button>
          </RegisterContainer>
        </Form>
      </Page>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <ScrollableContainer contentContainerStyle={{margin: 10}}>
          {family.map((item, index) => {
            return (
              <CheckRadio
                value={item}
                checked={selectedFamily === item}
                handleChecked={(isCheck: boolean) => {
                  bottomSheetRef.current?.close();
                  setSelectedFamily(item);
                }}
              />
            );
          })}
        </ScrollableContainer>
      </CustomBottomSheet>
      <CalendarModal
        isCalendarVisible={isCalendarVisible}
        setIsCalendarVisible={value => {
          setIsCalendarVisible(value);
        }}
        expirationDate={expirationDate}
        productionDate={productionDate}
        handleDateChange={
          activeInput === 'productionDate'
            ? handleProductionDateChange
            : handleExpirationDateChange
        }
      />
    </>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 10px;
  flex: 1;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 50px;
  flex: 1;
  justify-content: flex-end;
`;
const ScrollableContainer = styled(ScrollView)``;
