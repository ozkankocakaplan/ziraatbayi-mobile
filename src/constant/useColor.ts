import useColorScheme from './useColorScheme';

const Colors = {
  light: {
    background: '#f0f0f0',
    primary: '#4AAF55',
    text: '#fff',
    secondary: '#D6F1D4',
    inputBorder: '#ebeff3',
    activeBorder: '#D6F1D4',
    iconColor: '#70B261',
    success: '#488E48',
    descriptionColor: '#797979',
    inputPlaceholder: '#868182',
    error: '#FF0000',
    textWhite: 'white',
    black: '#000',
  },
  dark: {
    background: '#f0f0f0',
    primary: '#4AAF55',
    text: '#fff',
    secondary: '#D6F1D4',
    inputBorder: '#ebeff3',
    activeBorder: '#D6F1D4',
    iconColor: '#70B261',
    success: '#488E48',
    descriptionColor: '#797979',
    inputPlaceholder: '#868182',
    error: '#FF0000',
    textWhite: 'white',
    black: '#000',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
