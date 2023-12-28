import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  heading__text: {
    fontSize: 32,
    color: '#131313',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  heading__img: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  tab: {
    width: 170,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  tab__active: {
    width: 170,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'rgba(135, 183, 31, 1)',
    borderRadius: 30,
  },
  tab__text: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  navigation: {
    width: 375,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navigation__inner: {
    width: 61,
    height: 'auto',
  },
  navigation__img: {
    alignSelf: 'center',
  },
  navigation__text: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 288,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
});
