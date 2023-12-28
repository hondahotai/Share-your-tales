import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  title: {
    color: '#131313',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  upload__wrapper: {
    width: 343,
    gap: 8,
    height: 166,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#87B71F',
    alignSelf: 'center',
  },
  upload: {},
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
  button: {
    backgroundColor: '#87B71F',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 52,
  },
  button__text: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
