import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F5F4',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    flex: 1,
    marginVertical: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 13,
  },
  title: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#131313',
  },
  date: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#9B9B9B',
  },
  img: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: 343,
    height: 226,
  },
  info__wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
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
  delete__button: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: -50,
    width: 130,
    backgroundColor: '#C2534C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  delete__text: {
    color: '#FFF',
    textAlign: 'center',
  },
  delete__image: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});
