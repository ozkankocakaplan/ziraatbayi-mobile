import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Col, Row} from '../../constant/GlobalStyled';
import Page from '../../components/Page/Page';
import styled from 'styled-components';
import Container from '../../components/Container/Container';
import useChatMessages from '../../hooks/useChatMessages';
import MessageResponse from '../../payload/response/MessageResponse';
import Loading from '../../components/Loading/Loading';
import ProductImage from '../../components/Advert/ProductImage';
import CustomText from '../../components/Text/Text';
import usePhoto from '../../hooks/usePhoto';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
const LAST_LIMIT = 50;

export default function ChatRoomScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ChatRoomScreen'>) {
  const {
    chatId,
    receiverFullName,
    senderFullName,
    senderId,
    product,
    receiverId,
  } = route.params;
  const [lastLimit, setLastLimit] = useState(LAST_LIMIT);
  const {initLaunchImage, photos, resetPhotos} = usePhoto();
  const user = useSelector((state: RootState) => state.auth.user);
  const {messages, loading} = useChatMessages(chatId);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (
      flatListRef.current &&
      messages.slice(-LAST_LIMIT).length === LAST_LIMIT
    ) {
      let scrollEnd = setTimeout(() => {
        slideToBottom();
      }, 100);
      return () => {
        clearTimeout(scrollEnd);
      };
    }
  }, [flatListRef.current, messages]);

  const slideToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };
  const calculateLastLimit = useCallback(() => {
    if (lastLimit > messages.length) {
      return false;
    }
    return true;
  }, [lastLimit, messages.length]);
  return (
    <Page
      header
      title={
        user?.id?.toString() !== senderId?.toString()
          ? receiverFullName
          : senderFullName
      }
      showGoBack
      showGoToDealerButton={() => {
        if (user?.id?.toString() === senderId?.toString()) {
          navigation.navigate('DealerDetailScreen', {id: Number(receiverId)});
        }
      }}>
      <Loading loading={loading}>
        <Container>
          <ProductInfoContainer>
            <Row gap={10}>
              <ProductImageContainer>
                <ProductImage imageUrl={product?.images?.[0]?.imageUrl || ''} />
              </ProductImageContainer>
              <Col gap={5}>
                <CustomText numberOfLines={1} color="black">
                  {product?.name}
                </CustomText>
                <CustomText color="grey" fontSizes="caption1" numberOfLines={2}>
                  {product?.activeSubstance}
                </CustomText>
                <CustomText color="grey" fontSizes="caption1" numberOfLines={2}>
                  {product?.manufacturer?.name}
                </CustomText>
              </Col>
            </Row>
          </ProductInfoContainer>
          <ShowMoreButton
            isShow={calculateLastLimit()}
            onPress={() => {
              setLastLimit(lastLimit + LAST_LIMIT);
              if (lastLimit + LAST_LIMIT >= messages.length) {
                return false;
              }
              return true;
            }}
          />
          <FlatList
            maintainVisibleContentPosition={{minIndexForVisible: 0}}
            ref={flatListRef}
            data={messages.slice(-lastLimit)}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({animated: true})
            }
            keyExtractor={(item: MessageResponse) => item.messageId}
            renderItem={({item}) => {
              const isCurrentUser = item.senderId === senderId.toString();
              return (
                <ChatBubble
                  item={item}
                  isCurrentUser={isCurrentUser}
                  senderFullName={senderFullName}
                  receiverFullName={receiverFullName}
                />
              );
            }}
          />
        </Container>
        <ChatInput
          productId={product?.id || 0}
          chatId={chatId}
          senderId={senderId}
          receiverId={receiverId}
          initLaunchImage={initLaunchImage}
          resetPhotos={() => {
            resetPhotos();
          }}
          selectedFile={
            photos.length > 0
              ? {
                  uri: photos[0].uri,
                  name: photos[0].fileName,
                }
              : undefined
          }
        />
      </Loading>
    </Page>
  );
}

const ProductInfoContainer = styled(View)`
  padding: 7px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 75px;
  background-color: #fff;
`;

const ProductImageContainer = styled(View)`
  height: 60px;
  width: 60px;
  margin-left: 10px;
`;
