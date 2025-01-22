import {View, Platform} from 'react-native';
import React, {useEffect} from 'react';
import CustomBottomSheet, {BottomSheetRef} from './CustomBottomSheet';
import Container from '../Container/Container';
import {Col, Row} from '../../constant/GlobalStyled';
import CustomText from '../Text/Text';
import Button from '../Button/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigator';
import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkEqualChatId,
  formatDate,
  generateChatId,
} from '../../helper/Helper';
import {AdvertActions} from '../../store/features/advertReducer';
import ProductImage from '../Advert/ProductImage';
import ProductResponse from '../../payload/response/ProductResponse';
import {SIZES, TEXT_WIDTH} from '../../constant/theme';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import WhatsApp from '../WhatsApp/WhatsApp';

const SendButtonMarginBottom = Platform.select({
  ios: 20,
  android: 10,
});

export default function AdvertDetailBottomSheet() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const advertBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const advertDetail = useSelector((state: RootState) => state.advert.advert);

  useEffect(() => {
    if (advertBottomSheetRef.current) {
      dispatch(
        AdvertActions.setAdvertBottomSheetRef(advertBottomSheetRef.current),
      );
    }
  }, [advertBottomSheetRef]);

  let isEquals = checkEqualChatId(
    generateChatId(
      Number(user?.id),
      Number(advertDetail?.dealer.id),
      Number(advertDetail?.id),
    ),
  );

  return (
    <CustomBottomSheet ref={advertBottomSheetRef} snapPoints={['60%']}>
      {advertDetail && (
        <>
          <BottomSheetScrollView>
            <Container m={5} bgColor="white">
              <Row gap={10}>
                <Row gap={10}>
                  <View
                    style={{
                      height: 100,
                      width: 100,
                    }}>
                    <ProductImage
                      imageUrl={
                        advertDetail?.product?.images?.[0]?.imageUrl || ''
                      }
                    />
                  </View>
                </Row>
                <Row>
                  <Col gap={12}>
                    <CustomText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      sx={{width: TEXT_WIDTH}}
                      color="black"
                      fontSizes="body4"
                      fontWeight="bold">
                      {advertDetail?.product?.name}
                    </CustomText>
                    <Row gap={2}>
                      <CustomText
                        sx={{width: TEXT_WIDTH}}
                        color="darkGrey"
                        fontSizes="body6"
                        fontWeight="bold">
                        Üretici Firma:{' '}
                        <CustomText color="black" fontSizes="body6">
                          {advertDetail?.product?.manufacturer?.name}
                        </CustomText>
                      </CustomText>
                    </Row>
                    <Row gap={2}>
                      <CustomText
                        sx={{width: TEXT_WIDTH}}
                        color="darkGrey"
                        fontSizes="body6"
                        fontWeight="bold">
                        Kategori:{' '}
                        <CustomText color="black" fontSizes="body6">
                          {advertDetail?.product?.categoryName}
                        </CustomText>
                      </CustomText>
                    </Row>
                    <Row gap={2}>
                      <CustomText
                        sx={{width: TEXT_WIDTH}}
                        color="darkGrey"
                        fontSizes="body6"
                        fontWeight="bold">
                        Etken Madde:{' '}
                        <CustomText
                          color="black"
                          fontSizes="body6"
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {advertDetail?.product?.activeSubstance}
                        </CustomText>
                      </CustomText>
                    </Row>
                    {advertDetail.startDate && (
                      <Row gap={2}>
                        <CustomText
                          color="darkGrey"
                          fontSizes="body6"
                          fontWeight="bold">
                          Üretim Tarihi:
                        </CustomText>
                        <CustomText
                          color="black"
                          fontSizes="body6"
                          fontWeight="light">
                          {formatDate(advertDetail?.startDate || '')}
                        </CustomText>
                      </Row>
                    )}
                    <Row gap={2}>
                      <CustomText
                        color="darkGrey"
                        fontSizes="body6"
                        fontWeight="bold">
                        Son Tüketim Tarihi:
                      </CustomText>
                      <CustomText
                        color="black"
                        fontSizes="body6"
                        fontWeight="light">
                        {formatDate(advertDetail?.expiryDate || '')}
                      </CustomText>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Container>
            <Container m={14} bgColor="white">
              <Col gap={10}>
                <CustomText color="black" fontSizes="body3" fontWeight="bold">
                  Ürün Açıklaması
                </CustomText>
                <CustomText
                  color="black"
                  fontSizes="body5"
                  sx={{width: SIZES.width - 30}}
                  numberOfLines={6}
                  ellipsizeMode="tail">
                  {advertDetail?.product?.description}
                </CustomText>
              </Col>
            </Container>
          </BottomSheetScrollView>
          {!isEquals && (
            <Container
              noFlex
              bgColor="white"
              mx={10}
              mb={SendButtonMarginBottom}>
              <Button
                hitSlop={15}
                onPress={() => {
                  if (isEquals) {
                    return;
                  }
                  WhatsApp.open({
                    phone: advertDetail?.dealer?.phone || '',
                    message: `Merhaba, ${advertDetail?.product?.name} ürünü hakkında bilgi almak istiyorum.`,
                    onSuccess: () => {
                      advertBottomSheetRef.current?.close();
                    },
                    onError: error => {
                      console.error(error);
                    },
                  });
                }}
                text="MESAJ GÖNDER"
              />
            </Container>
          )}
        </>
      )}
    </CustomBottomSheet>
  );
}
