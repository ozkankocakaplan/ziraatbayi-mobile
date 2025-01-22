import {View, FlatList, Dimensions, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import CustomListProps from './CustomFlatListProps';
import Input from '../Input/Input';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../Text/Text';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

export default function CustomFlatList(props: CustomListProps) {
  const [onRefresh, setOnRefresh] = useState(false);
  const [search, setSearch] = useState('');

  const GetData = () => {
    if (props.data && props.data.length != 0) {
      if (props.listFilter && props.listSort) {
        return [...props.data]
          .sort(props.listSort)
          .filter(item =>
            props.listFilter != undefined
              ? props.listFilter(item, search)
              : item,
          );
      } else {
        if (props.listSort) {
          return props.data.sort(props.listSort);
        } else if (props.listFilter) {
          return [...props.data].filter(item =>
            props.listFilter != undefined
              ? props.listFilter(item, search)
              : item,
          );
        } else {
          return [...props.data];
        }
      }
    } else {
      return [];
    }
  };

  return (
    <>
      {props.isSearchable && (
        <View style={{marginBottom: 10}}>
          <Input
            enableFocusBorder={false}
            inputSize="sm"
            style={{backgroundColor: '#fff'}}
            icon={faSearch}
            placeholder={props.searchPlaceholder || 'Ara'}
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </View>
      )}
      {props.extraData}
      {GetData() && GetData().length != 0 ? (
        !props.isBottomSheet ? (
          <FlatList
            {...props}
            data={GetData() || []}
            contentContainerStyle={props?.contentContainerStyle}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => props.renderItem(item, index)}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.5}
            refreshControl={
              props.handleRefresh ? (
                <RefreshControl
                  refreshing={onRefresh}
                  onRefresh={() => {
                    setOnRefresh(true);
                    if (props.handleRefresh) {
                      props.handleRefresh();
                    }
                    setOnRefresh(false);
                  }}
                />
              ) : undefined
            }
          />
        ) : (
          <BottomSheetFlatList
            {...props}
            data={GetData() || []}
            contentContainerStyle={props?.contentContainerStyle}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => props.renderItem(item, index)}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={onRefresh}
                onRefresh={() => {
                  setOnRefresh(true);
                  if (props.handleRefresh) {
                    props.handleRefresh();
                  }
                  setOnRefresh(false);
                }}
              />
            }
          />
        )
      ) : props.customNotFound && !search ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            height: Dimensions.get('window').height,
          }}>
          {props.customNotFound}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height,
          }}>
          <CustomText center fontSizes="body6" color="default">
            {props.notFoundText || 'Veri bulunamadı.'}
          </CustomText>
        </View>
      )}
    </>
  );
}
