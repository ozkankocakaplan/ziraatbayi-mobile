import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import useThemeColors from '../../constant/useColor';

interface CalendarModalProps {
  isCalendarVisible: boolean;
  setIsCalendarVisible: (value: boolean) => void;
  expirationDate: string;
  productionDate: string;
  handleDateChange: (day: any) => void;
  minDate?: string;
}
export default function CalendarModal(props: CalendarModalProps) {
  const {
    isCalendarVisible,
    setIsCalendarVisible,
    expirationDate,
    productionDate,
    handleDateChange,
  } = props;
  const colors = useThemeColors();

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isCalendarVisible}
      onRequestClose={() => setIsCalendarVisible(false)}>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsCalendarVisible(false)}
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <View style={{marginHorizontal: 10}}>
          <Calendar
            minDate={props.minDate}
            onDayPress={handleDateChange}
            markedDates={{
              [dayjs(productionDate).format('YYYY-MM-DD')]: {
                selected: true,
                selectedColor: colors.primary,
                startingDay: true,
              },
              [dayjs(expirationDate).format('YYYY-MM-DD')]: {
                selected: true,
                selectedColor: colors.primary,
                endingDay: true,
              },
            }}
            style={{borderRadius: 10}}
          />
        </View>
      </View>
    </Modal>
  );
}
