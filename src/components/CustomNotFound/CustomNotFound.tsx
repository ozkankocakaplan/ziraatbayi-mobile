import {View, Text} from 'react-native';
import React from 'react';
import Container from '../Container/Container';
import CustomText from '../Text/Text';
import LottieView from 'lottie-react-native';
import {NotFoundAnimation} from '../../assets/lottie/LottieData';
import {SIZES} from '../../constant/theme';

export default function CustomNotFound({
  notFoundText,
}: {
  notFoundText?: string;
}) {
  return (
    <Container bgColor="transparent" gap={10}>
      <Container
        bgColor="transparent"
        jContent="center"
        aItems="center"
        mb={170}
        mr={30}>
        <LottieView
          style={{
            width: SIZES.width / 1.5,
            height: 275,
          }}
          autoPlay
          loop={false}
          source={NotFoundAnimation}
        />
        {notFoundText && (
          <CustomText fontSizes="body4" color="primary" fontWeight="bold">
            {notFoundText}
          </CustomText>
        )}
      </Container>
    </Container>
  );
}
