import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';

interface CalendarModalProps {
  isCalendarVisible: boolean;
  setIsCalendarVisible: (value: boolean) => void;
  selectedDate: string;
  handleDateChange: (day: any) => void;
}
export default function CalendarModal(props: CalendarModalProps) {
  const {
    isCalendarVisible,
    setIsCalendarVisible,
    selectedDate,
    handleDateChange,
  } = props;
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
          position: 'relative',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsCalendarVisible(false)}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <View style={{marginHorizontal: 10}}>
          <Calendar
            onDayPress={handleDateChange}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#007AFF',
              },
            }}
            style={{borderRadius: 10}}
          />
        </View>
      </View>
    </Modal>
  );
}
