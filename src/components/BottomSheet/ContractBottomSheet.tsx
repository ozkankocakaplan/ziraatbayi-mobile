import {View, Text, Platform, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomBottomSheet, {BottomSheetRef} from './CustomBottomSheet';
import {WebView} from 'react-native-webview';
interface ContractBottomSheetProps {
  contractBottomSheetRef: React.RefObject<BottomSheetRef>;
}

export default function ContractBottomSheet({
  contractBottomSheetRef,
}: ContractBottomSheetProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, []);
  return (
    <CustomBottomSheet ref={contractBottomSheetRef} snapPoints={['90%']}>
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <WebView
        onLoad={() => {}}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
        source={{uri: 'https://ziraatbayi.com/legal/privacy-mobile'}}
        style={{flex: isLoading ? 0 : 1}}
      />
    </CustomBottomSheet>
  );
}
