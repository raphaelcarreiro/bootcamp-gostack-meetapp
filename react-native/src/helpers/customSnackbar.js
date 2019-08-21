import Snackbar from 'react-native-snackbar';

export default function CustomSnackbar(
  title = '',
  backgroundColor = 'rgba(0, 0, 0, 0.6)',
  color = '#fff'
) {
  Snackbar.show({
    title,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor,
    color,
  });
}
