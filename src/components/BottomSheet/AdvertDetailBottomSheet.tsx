import {View, Text} from 'react-native';
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
import {checkEqualChatId, generateChatId} from '../../helper/Helper';
import styled from 'styled-components';
import {AdvertActions} from '../../store/features/advertReducer';
import ProductImage from '../Advert/ProductImage';
import ProductResponse from '../../payload/response/ProductResponse';

export default function AdvertDetailBottomSheet() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const advertBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const advertDetail = useSelector((state: RootState) => state.advert.advert);

  useEffect(() => {
    if (advertBottomSheetRef.current) {
      dispatch(
        AdvertActions.setAdvertBottomSheetRef(advertBottomSheetRef.current),
      );
    }
  }, [advertBottomSheetRef]);
  const goToChatRoom = ({
    chatId,

    product,
  }: {
    chatId: string;

    product: ProductResponse;
  }) => {
    const senderFullName = user?.firstName + ' ' + user?.lastName;
    const receiverId = advertDetail?.dealer.id.toString() || '';
    const receiverFullName =
      advertDetail?.dealer?.firstName + ' ' + advertDetail?.dealer?.lastName;
    const userId = user?.id.toString() || '';
    let isSender = advertDetail?.dealer.id?.toString() === user?.id.toString();
    navigation.navigate('ChatRoomScreen', {
      chatId: chatId,
      receiverFullName: isSender ? receiverFullName : senderFullName,
      senderFullName: isSender ? senderFullName : receiverFullName,
      senderId: userId,
      receiverId: isSender ? userId : receiverId,
      product: product,
    });
  };
  let isEquals = checkEqualChatId(
    generateChatId(Number(user?.id), Number(advertDetail?.dealer.id)),
  );
  return (
    <CustomBottomSheet ref={advertBottomSheetRef} snapPoints={['60%']}>
      <Container m={5} flex={0.3} bgColor="white">
        <Row gap={10}>
          <AccountProfile>
            <ProductImage
              imageUrl={advertDetail?.product?.images?.[0]?.imageUrl || ''}
            />
          </AccountProfile>
          <Col gap={12}>
            <CustomText color="black" fontSizes="body4" fontWeight="bold">
              {advertDetail?.product?.name}
            </CustomText>
            <CustomText color="black" fontSizes="body6">
              {advertDetail?.product?.categoryName}
            </CustomText>
            <CustomText color="black" fontSizes="body6">
              Stok Miktarı : {advertDetail?.stockQuantity}
            </CustomText>
            {/* <CustomText color="black" fontSizes="body5">
              Fiyat
            </CustomText> */}
          </Col>
        </Row>
      </Container>
      <Container flex={0.5} m={14} bgColor="white">
        <Col gap={10}>
          <CustomText color="black" fontSizes="body3" fontWeight="bold">
            Ürün Açıklaması
          </CustomText>
          <CustomText color="black" fontSizes="body5">
            {advertDetail?.product?.description}
          </CustomText>
        </Col>
      </Container>
      {!isEquals && (
        <Container flex={0.1} bgColor="white" mx={10}>
          <Button
            onPress={() => {
              if (isEquals) {
                return;
              }
              advertBottomSheetRef.current?.close();
              goToChatRoom({
                chatId: generateChatId(
                  Number(user?.id),
                  Number(advertDetail?.dealer.id),
                ),
                product: advertDetail?.product as ProductResponse,
              });
            }}
            style={{marginTop: 20}}
            text="MESAJ GÖNDER"></Button>
        </Container>
      )}
    </CustomBottomSheet>
  );
}
const AccountProfile = styled(View)`
  height: 100px;
  width: 100px;
  margin-left: 10px;
`;
