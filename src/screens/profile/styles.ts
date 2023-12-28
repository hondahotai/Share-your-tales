import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    position: 'relative',
    zIndex: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#131313',
  },
  submit: {
    color: 'rgba(135, 183, 31, 1)',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(135, 183, 31, 1)',
  },
  photo__wrapper: {
    alignSelf: 'center',
    position: 'relative',
  },
  photo__image: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },

  photo__icon: {
    position: 'absolute',
    top: 120,
    right: 0,
  },
  title__profile: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#131313',
    marginTop: 32,
  },
  label: {
    color: '#9B9B9B',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    borderBottomWidth: 1.5,
    borderBottomColor: '#9B9B9B',
  },
  gender__wrapper: {
    marginTop: 16,
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  label__gender: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#131313',
  },
  error: {
    color: 'rgb(201,16,16)',
  },
  scroll: {
    marginBottom: 16,
    position: 'relative',
  },
});
