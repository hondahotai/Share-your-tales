import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  userData: {
    color: '#131313',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: 60,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 32,
  },
  buttons__text: {
    color: '#131313',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  theme: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 40,
    left: 32,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
