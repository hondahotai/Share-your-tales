import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    flex: 1,
  },
  photo__change: {
    position: 'absolute',
    width: 343,
    height: 200,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    zIndex: 1000,
    borderRadius: 20,
    bottom: '0%',
    alignSelf: 'center',
  },
  item__change: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingTop: 12,
    textAlign: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  item__changeBorder: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingTop: 12,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(155, 155, 155, 1),',
    borderRadius: 20,
  },
  item__text: {
    color: 'rgba(135, 183, 31, 1)',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    flex: 1,
    alignItems: 'center',
  },
  item__textRed: {
    color: 'rgba(194, 83, 76, 1)',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    flex: 1,
    alignItems: 'center',
  },

  item__cancel: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingTop: 12,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
});