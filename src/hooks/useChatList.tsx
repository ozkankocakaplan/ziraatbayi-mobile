import database from '@react-native-firebase/database';

import {useEffect, useState} from 'react';
import MessageResponse from '../payload/response/MessageResponse';
import FirebaseApi from '../services/firebaseService';
import auth from '@react-native-firebase/auth';
const useChatList = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Array<MessageResponse>>([]);
  const [getChatInfo] = FirebaseApi.useGetChatInfoMutation();
  useEffect(() => {
    const chatsRef = database().ref('/messages');
    const checkIfMessagesExist = async () => {
      try {
        const snapshot = await chatsRef.once('value');
        if (!snapshot.exists()) {
          setChats([]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking messages existence:', error);
        setLoading(false);
      }
    };
    const onValueChange = chatsRef.on('value', async snapshot => {
      const currentUserId = await auth().currentUser?.uid;
      const data = snapshot.val();
      if (data) {
        try {
          const chatPromises = Object.keys(data).map(async chatId => {
            const messages = (
              Object.values(data[chatId]) as MessageResponse[]
            ).sort((a, b) => a.timestamp - b.timestamp);

            const lastMessage = messages[
              messages.length - 1
            ] as MessageResponse;
            if (!lastMessage) {
              console.log(`No lastMessage found for chatId: ${chatId}`);
              return null;
            }

            if (
              lastMessage.senderId?.toString() === currentUserId ||
              lastMessage.receiverId?.toString() === currentUserId
            ) {
              const response = await getChatInfo({
                receiverId: Number(lastMessage.receiverId),
                senderId: Number(lastMessage.senderId),
                productId: Number(lastMessage.productId),
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
                isRead: lastMessage.isRead,
                contentType: lastMessage.contentType,
                productId: lastMessage.productId,
                product: response.entity.product,
              };
            }
            return null;
          });

          const parsedChats = (await Promise.all(chatPromises)).filter(
            chat => chat !== null,
          );
          setChats(parsedChats);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching chat data:', error);
        }
      }
    });
    checkIfMessagesExist();
    return () => chatsRef.off('value', onValueChange);
  }, []);
  const updateMessageReadToTrue = async (chatId: string) => {
    let tempChats = [...chats];
    const chatIndex = tempChats.findIndex(chat => chat.chatId === chatId);
    if (chatIndex !== -1) {
      let chats = tempChats[chatIndex];
      let lastMessage = chats.lastMessage;
      lastMessage.isRead = true;
      chats.lastMessage = lastMessage;
      tempChats[chatIndex] = chats;
      setChats(tempChats);
    }
  };
  return {chats, loading, updateMessageReadToTrue};
};

export default useChatList;
