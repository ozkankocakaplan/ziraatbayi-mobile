import database from '@react-native-firebase/database';

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import MessageResponse from '../payload/response/MessageResponse';
import FirebaseApi from '../services/firebaseService';

const useChatList = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Array<MessageResponse>>([]);
  const [getFullName] = FirebaseApi.useGetSenderReceiverNamesMutation();
  useEffect(() => {
    const chatsRef = database().ref('/messages');
    const onValueChange = chatsRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        (async () => {
          try {
            const chatPromises = Object.keys(data).map(async chatId => {
              const messages = Object.values(data[chatId]);
              const lastMessage = messages[
                messages.length - 1
              ] as MessageResponse;

              console.log('Fetching names for:', {
                receiverId: Number(lastMessage.receiverId),
                senderId: Number(lastMessage.senderId),
              });

              const response = await getFullName({
                receiverId: Number(lastMessage.receiverId),
                senderId: Number(lastMessage.senderId),
              }).unwrap();
              return {
                chatId,
                lastMessage,
                content: lastMessage.content,
                messageId: lastMessage.messageId,
                timestamp: lastMessage.timestamp,
                receiverId: lastMessage.receiverId,
                senderId: lastMessage.senderId,
                receiverFullName: response.entity.receiverFullName,
                senderFullName: response.entity.senderFullName,
                type: lastMessage.type,
              };
            });

            const parsedChats = await Promise.all(chatPromises);

            setChats(parsedChats);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching chat data:', error);
          }
        })();
      }
    });
    return () => chatsRef.off('value', onValueChange);
  }, [userId]);

  return {chats, loading};
};

export default useChatList;
