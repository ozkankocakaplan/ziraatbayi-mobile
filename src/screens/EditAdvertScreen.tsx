import React, {useRef, useState} from 'react';
import Page from '../components/Page/Page';
import {FormContainerRef} from 'react-native-form-container';
import Input from '../components/Input/Input';

import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import {ScrollView} from 'react-native';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import CheckRadio from '../components/CheckInput/CheckRadio';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import CalendarModal from '../components/CalendarModal/CalendarModal';
import dayjs from 'dayjs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {Row} from '../constant/GlobalStyled';
import Container from '../components/Container/Container';

const family = ['Feriza', 'Özkan'];
export default function EditAdvertScreen(
  props: NativeStackScreenProps<RootStackParamList, 'EditAdvertScreen'>,
) {
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
        <Container mx={10} mt={10} gap={10}>
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
          <Row between center>
            <CustomText sx={{marginTop: 16, marginLeft: 10}} color="black">
              İlan durumu
            </CustomText>
            {/* <SwitchButton value={false} /> */}
          </Row>
        </Container>
        <Container flex={0.12} mx={10}>
          <Button text="Kaydet"></Button>
        </Container>
      </Page>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <ScrollView contentContainerStyle={{margin: 10}}>
          {family.map((item, index) => {
            return (
              <CheckRadio
                key={index}
                value={item}
                checked={selectedFamily === item}
                handleChecked={(isCheck: boolean) => {
                  bottomSheetRef.current?.close();
                  setSelectedFamily(item);
                }}
              />
            );
          })}
        </ScrollView>
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
