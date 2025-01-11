import {View, Text} from 'react-native';
import React, {memo} from 'react';
import MessageResponse from '../../payload/response/MessageResponse';
import ProductImage from '../../components/Advert/ProductImage';

interface ChatBubbleProps {
  isCurrentUser: boolean;
  senderFullName: string;
  receiverFullName: string;
  item: MessageResponse;
}
function ChatBubble(props: ChatBubbleProps) {
  const {isCurrentUser, senderFullName, receiverFullName, item} = props;
  return (
    <View
      style={
        item.contentType === 'text'
          ? {
              alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
              backgroundColor: isCurrentUser ? '#4caf50' : '#4caf50',
              borderRadius: 10,
              borderTopRightRadius: isCurrentUser ? 0 : 10,
              borderTopLeftRadius: isCurrentUser ? 10 : 0,
              padding: 10,
              marginVertical: 5,
              maxWidth: '70%',
              marginHorizontal: 10,
              opacity: item.isPending ? 0.7 : 1,
            }
          : {
              padding: 10,
              alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
              opacity: item.isPending ? 0.7 : 1,
            }
      }>
      {!isCurrentUser && (
        <Text
          style={[
            {
              color: item.contentType === 'text' ? '#fff' : '#4caf50',
              fontWeight: 'bold',
            },
            item.contentType === 'text' ? {} : {marginBottom: 5},
          ]}>
          {!isCurrentUser ? senderFullName : receiverFullName}
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
          <ProductImage isImageView imageUrl={item.content} />
        </View>
      )}
      <Text
        style={{
          fontSize: 10,
          color: item.contentType === 'text' ? '#e0e0e0' : '#4caf50',
          alignSelf: 'flex-end',
          marginTop: 5,
        }}>
        {item.isPending ? 'Gönderiliyor...' : new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );
}
export default memo(ChatBubble);
