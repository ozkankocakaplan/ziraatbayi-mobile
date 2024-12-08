import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Col, Row} from '../../constant/GlobalStyled';
import {useGetProductImageForChatMutation} from '../../services/advertService';

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
const LAST_LIMIT = 10;

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
  const [getProductImage] = useGetProductImageForChatMutation();
  const slideToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  return (
    <Page
      header
      title={
        user?.id?.toString() === senderId?.toString()
          ? receiverFullName
          : senderFullName
      }
      showGoBack
      showGoToDealerButton={() => {
        console.log('Go to dealer button clicked');
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
            isShow={LAST_LIMIT >= messages.length ? false : true}
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
                <View
                  style={
                    item.contentType === 'text'
                      ? {
                          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                          backgroundColor: isCurrentUser
                            ? '#4caf50'
                            : '#4caf50',
                          borderRadius: 10,
                          borderTopRightRadius: isCurrentUser ? 0 : 10,
                          borderTopLeftRadius: isCurrentUser ? 10 : 0,
                          padding: 10,
                          marginVertical: 5,
                          maxWidth: '70%',
                          marginHorizontal: 10,
                        }
                      : {
                          padding: 10,
                          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                        }
                  }>
                  {!isCurrentUser && (
                    <Text
                      style={[
                        {
                          color:
                            item.contentType === 'text' ? '#fff' : '#4caf50',
                          fontWeight: 'bold',
                        },
                        item.contentType === 'text' ? {} : {marginBottom: 5},
                      ]}>
                      {isCurrentUser ? senderFullName : receiverFullName}
                    </Text>
                  )}
                  {item.contentType === 'text' ? (
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      {item.content}
                    </Text>
                  ) : (
                    <View
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      <ProductImage imageUrl={item.content} />
                    </View>
                  )}
                  <Text
                    style={{
                      fontSize: 10,
                      color:
                        item.contentType === 'text' ? '#e0e0e0' : '#4caf50',
                      alignSelf: 'flex-end',
                      marginTop: 5,
                    }}>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
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
