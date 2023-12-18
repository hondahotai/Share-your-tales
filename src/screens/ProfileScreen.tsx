import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {PROFILE_EDIT} from '../apollo/mutations/profileMutations.ts';
import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

export const ProfileScreen = () => {
  const [UserEditProfile, {loading, error, data}] = useMutation(PROFILE_EDIT);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      surName: '',
      gender: '',
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Image source={require('../assets/ArrowLeftButtonBack.png')}></Image>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.submit}>Done</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.photo__wrapper}>
          <Image source={require('../assets/StateEmptyUserBig.png')}></Image>
          <Image
            style={styles.photo__icon}
            source={require('../assets/DMButtonPhoto.png')}></Image>
        </View>
        <View>
          <Text style={styles.title__profile}>Personal info</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>First name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your first name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>Last name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your last name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="lastName"
          />
          {errors.firstName && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>Surname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your surname"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="surName"
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>
        <View>
          <Text style={styles.title__profile}>Gender</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.gender__wrapper}>
                <TouchableOpacity
                  style={styles.choice}
                  onPress={() => onChange('male')}>
                  <View style={styles.outerCircle}>
                    {value === 'male' && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.label__gender}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.choice}
                  onPress={() => onChange('female')}>
                  <View style={styles.outerCircle}>
                    {value === 'female' && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.label__gender}>Female</Text>
                </TouchableOpacity>
              </View>
            )}
            name="gender"
          />
        </View>
        <View>
          <Text style={styles.title__profile}>Date of birth</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
