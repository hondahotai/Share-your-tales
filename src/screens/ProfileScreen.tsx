import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {PROFILE_EDIT} from '../apollo/mutations/profileMutations.ts';
import {Controller, useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {birthValidation} from '../variables/birthValidation.ts';
import {emailValidation} from '../variables/emailValidation.ts';
import {phoneValidation} from '../variables/phoneValidation.ts';
import {USER_ME} from '../apollo/queries/userQueries.ts';
import {useNavigation} from '@react-navigation/native';

type EditProfileRequest = {
  avatarUrl: string;
  birthDate: string;
  country: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  middleName: string;
  phone: string;
};

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const [UserEditProfile, {loading, error, data}] = useMutation(PROFILE_EDIT);
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(USER_ME);

  const [formInitialized, setFormInitialized] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      surName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      number: '',
      country: '',
    },
  });

  useEffect(() => {
    if (dataUser && !loadingUser) {
      setValue('firstName', dataUser.userMe.firstName);
      setValue('lastName', dataUser.userMe.lastName);
      setValue('surName', dataUser.userMe.middleName);
      setValue('gender', dataUser.userMe.gender);
      setValue('dateOfBirth', dataUser.userMe.birthDate);
      setValue('email', dataUser.userMe.email);
      setValue('number', dataUser.userMe.phone);
      setValue('country', dataUser.userMe.country);
      setFormInitialized(true); //
    }
  }, [dataUser, loadingUser, setValue]);

  if (loadingUser || !formInitialized) {
    return <Text>Loading...</Text>;
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await UserEditProfile({
        variables: {
          input: {
            // avatarUrl: '',
            email: data.email,
            firstName: data.firstName,
            country: data.country,
            birthDate: data.dateOfBirth,
            gender: data.gender,
            lastName: data.lastName,
            middleName: data.surName,
            phone: data.number,
          },
        },
      });
      setIsSubmittedSuccessfully(true);
      navigation.navigate('Main');
    } catch (e: any) {
      console.log(e.message);
      setIsSubmittedSuccessfully(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Image source={require('../assets/ArrowLeftButtonBack.png')}></Image>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.submit} onPress={handleSubmit(onSubmit)}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
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
          {errors.firstName && (
            <Text style={styles.error}>This is required.</Text>
          )}
          <Controller
            control={control}
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
          {errors.firstName && (
            <Text style={styles.error}>This is required.</Text>
          )}
          <Controller
            control={control}
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
          {errors.firstName && (
            <Text style={styles.error}>This is required.</Text>
          )}
        </View>
        <View>
          <Text style={styles.title__profile}>Gender</Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.gender__wrapper}>
                <TouchableOpacity
                  style={styles.choice}
                  onPress={() => onChange('MALE')}>
                  <View style={styles.outerCircle}>
                    {value === 'MALE' && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.label__gender}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.choice}
                  onPress={() => onChange('FEMALE')}>
                  <View style={styles.outerCircle}>
                    {value === 'FEMALE' && <View style={styles.innerCircle} />}
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
          <Text>B-day</Text>
          <Controller
            control={control}
            rules={{
              pattern: {
                value: birthValidation,
                message: 'Enter a valid date in YYYY-MM-DD format',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Select bate of birth"
                keyboardType="numeric"
              />
            )}
            name="dateOfBirth"
          />
          {errors.dateOfBirth && (
            <Text style={styles.error}>{errors.dateOfBirth.message}</Text>
          )}
        </View>
        <View>
          <Text style={styles.title__profile}>Account info</Text>
          <Controller
            control={control}
            rules={{
              required: 'email is required',
              pattern: {
                value: emailValidation,
                message: 'Enter a valid email',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Select email"
                />
              </View>
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            // rules={{
            //   pattern: {
            //     value: phoneValidation,
            //     message: 'Enter a valid phone number',
            //   },
            // }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your phone number"
                />
              </View>
            )}
            name="number"
          />
          {errors.number && (
            <Text style={styles.error}>{errors.number.message}</Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>Country</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your country"
                />
              </View>
            )}
            name="country"
          />
          {errors.country && (
            <Text style={styles.error}>{errors.country.message}</Text>
          )}
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
    position: 'relative',
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
  error: {
    color: 'rgb(201,16,16)',
  },
  scroll: {
    marginBottom: 16,
  },
});
