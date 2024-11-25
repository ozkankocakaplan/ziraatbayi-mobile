import React, {
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps {
  children?: React.ReactNode;
  snapPoints?: string[];
  indicator?: boolean;
  close?: () => void;
  onLoad?: () => void;
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
  status: boolean;
}

const CustomBottomSheet = forwardRef<BottomSheetRef, BottomSheetComponentProps>(
  (props, ref) => {
    const {children, snapPoints, indicator = true, close, onLoad} = props;
    const bottomSheetRef = useRef<BottomSheet>(null);
    const isOpenRef = useRef(false);
    const [isOpen, setIsOpen] = useState(false);
    const cSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const openSheet = useCallback(() => {
      bottomSheetRef.current?.expand();
      isOpenRef.current = true;
      setIsOpen(true);
    }, []);

    const closeSheet = useCallback(() => {
      bottomSheetRef.current?.close();
      isOpenRef.current = false;
      setIsOpen(false);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: openSheet,
        close: closeSheet,
        status: isOpenRef.current,
      }),
      [isOpen],
    );
    useEffect(() => {
      if (isOpen) {
        onLoad && onLoad();
      }
    }, [isOpen]);

    const handleSheetChanges = (index: number) => {
      if (index === -1) {
        isOpenRef.current = false;
        close && close();
      }
      setIsOpen(index !== -1);
    };
    const renderBackdrop = (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        style={{zIndex: 100}}
        enablePanDownToClose
        snapPoints={cSnapPoints}
        enableDynamicSizing={snapPoints ? false : true}
        backgroundStyle={styles.contentContainer}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{display: indicator ? 'flex' : 'none'}}
        onChange={handleSheetChanges}>
        {snapPoints && snapPoints.length > 0 && isOpen ? (
          children
        ) : (
          <BottomSheetView
            style={{flex: 0, minHeight: 100, backgroundColor: 'white'}}>
            {isOpen && children}
          </BottomSheetView>
        )}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
  },
});

export default CustomBottomSheet;
