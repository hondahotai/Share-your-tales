import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  info__wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  user__img: {
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  user__name: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#9B9B9B',
  },
  info__btns: {
    flexDirection: 'row',
    gap: 12,
  },
  info__like: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  info__count: {
    color: '#131313',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  modal__inner: {
    padding: 20,
    alignSelf: 'center',
  },
  heading: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: 56,
    paddingVertical: 21,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#131313',
  },
  close: {
    position: 'absolute',
    top: 21,
    left: 16,
    zIndex: 200,
  },
  close__wrap: {
    position: 'relative',
    zIndex: 100,
  },
  date: {
    color: '#9B9B9B',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 8,
  },
  image: {
    marginBottom: 20,
    borderRadius: 20,
    width: 343,
    height: 226,
  },
  description: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#131313',
  },
});
