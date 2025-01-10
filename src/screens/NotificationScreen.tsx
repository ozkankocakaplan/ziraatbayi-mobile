import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {faBell, faTimes, faUndo} from '@fortawesome/free-solid-svg-icons';
import Page from '../components/Page/Page';
import Icon from '../components/Icon/Icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {NotificationApi} from '../services/notificationService';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import CustomNotFound from '../components/CustomNotFound/CustomNotFound';
import NotificationResponse from '../payload/response/NotificationResponse';
import dayjs from 'dayjs';

export default function NotificationScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const [notificationList, setNotificationList] = useState<
    NotificationResponse[]
  >([]);

  const {data, refetch} = NotificationApi.useGetNotificationsQuery();
  const {data: getNotificationCount} =
    NotificationApi.useGetNotificationCountQuery();
  const [updateNotificationRead] =
    NotificationApi.useUpdateNotificationReadMutation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);
  useEffect(() => {
    if (data) {
      setNotificationList(data?.list || []);
    }
  }, [data]);
  return (
    <Page header title="Bildirimler" showGoBack>
      <CustomFlatList
        customNotFound={<CustomNotFound notFoundText="Bildirim bulunamadı" />}
        handleRefresh={() => {
          refetch();
        }}
        data={notificationList}
        renderItem={(item: NotificationResponse) => {
          return (
            <NotificationCard
              onPress={async () => {
                if (item.isRead == false) {
                  await updateNotificationRead(item.id);
                  let updatedList = notificationList.map(x => {
                    return x.id === item.id ? {...x, isRead: true} : x;
                  });
                  setNotificationList(updatedList);
                }
              }}
              activeOpacity={0.7}
              key={item?.id}
              bgColor={item.isRead ? '#fff' : '#D0F5D5'}>
              <IconContainer>
                <Icon icon={faBell} size={20} color="#1F8505" />
              </IconContainer>
              <Content>
                <NotificationTitle>{item?.title}</NotificationTitle>
                <NotificationDescription>
                  {item?.message}
                </NotificationDescription>
                <NotificationDate>
                  {dayjs().format('DD/MM/YYYY')}
                </NotificationDate>
              </Content>
            </NotificationCard>
          );
        }}
      />
    </Page>
  );
}

const NotificationCard = styled(TouchableOpacity)<{bgColor: string}>`
  background-color: ${({bgColor}) => bgColor};
  padding: 15px;
  flex-direction: row;
  align-items: flex-start;
`;

const IconContainer = styled(View)`
  background-color: #fff;
  border-radius: 50px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: 1px solid #ebeff3;
`;

const Content = styled(View)`
  flex: 1;
`;

const NotificationTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 5px;
`;

const NotificationDescription = styled(Text)`
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
`;

const NotificationDate = styled(Text)`
  font-size: 12px;
  color: #999999;
  margin-top: 5px;
`;
