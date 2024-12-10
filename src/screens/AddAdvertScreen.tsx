import React, {useEffect, useRef, useState} from 'react';
import Page from '../components/Page/Page';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {AdvertApi} from '../services/advertService';
import CreateAdvertRequest from '../payload/request/CreateAdvertRequest';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import Button from '../components/Button/Button';
import CheckRadio from '../components/CheckInput/CheckRadio';
import {Calendar} from 'react-native-calendars';

const family = ['Feriza', 'Özkan'];
export default function AddAdvertScreen(
  props: NativeStackScreenProps<RootStackParamList, 'AddAdvertScreen'>,
) {
  var ref = useRef<FormContainerRef>(null);
  const [useRegister] = AdvertApi.useCreateAdvertMutation();
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [advertRequest, setAdvertRequest] = useState<CreateAdvertRequest>({
    productId: 0,
    stockQuantity: 1,
    expiryDate: '',
  });
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (day: any) => {
    console.log('Tarih Seçildi:', day.dateString);
    const formattedDate = formatDate(day.dateString);
    setSelectedDate(formattedDate);
    setIsCalendarVisible(false);
  };
  const handleOpenCalendar = () => {
    console.log('Modal Açılacak');
    setIsCalendarVisible(true);
    console.log(isCalendarVisible);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    console.log('Calendar Visible:', isCalendarVisible); // Modal'ın durumu
  }, [isCalendarVisible]);
  return (
    <>
      <Page header showGoBack title="İlan Ekle">
        <Form formContainerRef={ref}>
          <CustomText sx={{marginBottom: 10}} fontSizes="body3" color="black">
            İlan Bilgileri
          </CustomText>
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
          <Input required id="stockQuantity" placeholder="Stok Miktarı" />
          <Input
            required
            id="orderQuantity"
            placeholder="Minimum Sipariş Miktarı"
          />
          <Input required id="price" placeholder="Fiyat" />

          <Input
            handlePress={handleOpenCalendar}
            isPlaceholder={!selectedDate}
            required
            id="expirationDate"
            placeholderValue="Son Kullanma Tarihi"
            value={selectedDate}
          />

          <RegisterContainer>
            <Button text="KAYDET"></Button>
          </RegisterContainer>
        </Form>
      </Page>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <ScrollableContainer contentContainerStyle={{margin: 10}}>
          {family.map((item, index) => {
            return (
              <CheckRadio
                key={item}
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
      {isCalendarVisible && (
        <Modal
          transparent
          animationType="slide"
          visible={isCalendarVisible}
          onRequestClose={() => setIsCalendarVisible(false)}>
          <ModalOverlay>
            <CalendarContainer>
              <Calendar
                onDayPress={handleDateChange}
                markedDates={{
                  [selectedDate]: {selected: true, selectedColor: '#007AFF'},
                }}
                style={{borderRadius: 10}}
              />
              <CloseButton>
                <Button
                  text="Kapat"
                  onPress={() => setIsCalendarVisible(false)}
                />
              </CloseButton>
            </CalendarContainer>
          </ModalOverlay>
        </Modal>
      )}
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

const ModalOverlay = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const CalendarContainer = styled(View)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

const CloseButton = styled(View)`
  margin-top: 10px;
  width: 100px;
`;
