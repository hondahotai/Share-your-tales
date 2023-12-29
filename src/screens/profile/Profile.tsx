import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {PROFILE_EDIT} from '../../api/mutations/profileMutations.ts';
import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useEffect, useState} from 'react';
import {birthValidation} from '../../services/birthValidation.ts';
import {emailValidation} from '../../services/emailValidation.ts';
import {USER_ME} from '../../api/queries/userQueries.ts';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {styles} from './styles.ts';
import {FormData} from './types.ts';
import {HomeScreenNavigationProp} from './types.ts';
import getCleanUrl from './hooks/getCleanUrl.ts';
import uploadFileToS3 from './hooks/uploadFileToS3.ts';
import getSignedUrl from './hooks/getSignedUrl.ts';
import {useDeletePhoto} from './hooks/handleDeletePhoto.ts';
import AvatarPicker from '../../components/AvatarPicker';
import {
  ARROW_LEFT_BUTTON_BACK,
  BUTTON_BLACK_ARROW_SECOND,
  BUTTON_PHOTO,
  BUTTON_PHOTO_BLACK,
  STATE_EMPTY_USER_BIG,
} from '../../assets/images';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

const Profile: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [isChangePhoto, setChangePhoto] = useState(false);

  const [UserEditProfile, {loading, error, data}] = useMutation(PROFILE_EDIT);
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(USER_ME);

  const [formInitialized, setFormInitialized] = useState(false);
  const [selectImage, setSelectImage] = useState(dataUser.userMe.avatarUrl);

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<FormData>({
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

  const handleNavigationMainScreen = () => {
    navigation.navigate(ScreenNames.MAIN);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await UserEditProfile({
        variables: {
          input: {
            avatarUrl: selectImage,
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
      navigation.navigate(ScreenNames.MAIN);
    } catch (e: any) {
      console.log(e.message);
      setIsSubmittedSuccessfully(false);
    }
  };

  const handleLibraryLaunch = async () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    try {
      setChangePhoto(false);
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }

      if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }

      if (response.assets && response.assets.length > 0) {
        const fileUri = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        const fileCategory = 'AVATARS';

        const signedUrl = await getSignedUrl(fileName, fileCategory);
        const uploadFileToServer = await uploadFileToS3(fileUri, signedUrl);
        const cleanUrl = getCleanUrl(signedUrl);
        setSelectImage(cleanUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCameraLaunch = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    try {
      setChangePhoto(false);
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      }
      if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      }
      if (response.assets && response.assets.length > 0) {
        const fileUri = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        const fileCategory = 'AVATARS';

        const signedUrl = await getSignedUrl(fileName, fileCategory);
        const uploadFileToServer = await uploadFileToS3(fileUri, signedUrl);
        const cleanUrl = getCleanUrl(signedUrl);
        setSelectImage(cleanUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePhoto = useDeletePhoto(
    selectImage,
    setSelectImage,
    setChangePhoto,
  );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? `#131313` : `#FFF`,
      }}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={handleNavigationMainScreen}>
          <Image
            source={
              isDark ? BUTTON_BLACK_ARROW_SECOND : ARROW_LEFT_BUTTON_BACK
            }></Image>
        </TouchableOpacity>
        <Text style={{...styles.title, color: isDark ? `#FFF` : `#131313`}}>
          Profile
        </Text>
        <TouchableOpacity>
          <Text style={styles.submit} onPress={handleSubmit(onSubmit)}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.photo__wrapper}>
          <TouchableOpacity
            onPress={() => {
              setChangePhoto(true);
            }}>
            <Image
              source={selectImage ? {uri: selectImage} : STATE_EMPTY_USER_BIG}
              style={styles.photo__image}></Image>
            <Image
              style={styles.photo__icon}
              source={isDark ? BUTTON_PHOTO_BLACK : BUTTON_PHOTO}></Image>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              ...styles.title__profile,
              color: isDark ? `#FFF` : `#131313`,
            }}>
            Personal info
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>First name</Text>
                <TextInput
                  style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                  placeholder="Enter your first name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
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
                  style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                  placeholder="Enter your last name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
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
                  style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                  placeholder="Enter your surname"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
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
          <Text
            style={{
              ...styles.title__profile,
              color: isDark ? `#FFF` : `#131313`,
            }}>
            Gender
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.gender__wrapper}>
                <TouchableOpacity
                  style={styles.choice}
                  onPress={() => onChange('MALE')}>
                  <View
                    style={{
                      ...styles.outerCircle,
                      borderColor: isDark ? `#696969FF` : `#131313`,
                    }}>
                    {value === 'MALE' && (
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: isDark ? `#FFF` : `#131313`,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      ...styles.label__gender,
                      color: isDark ? `#FFF` : `#131313`,
                    }}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.choice}
                  onPress={() => onChange('FEMALE')}>
                  <View
                    style={{
                      ...styles.outerCircle,
                      borderColor: isDark ? `#696969FF` : `#131313`,
                    }}>
                    {value === 'FEMALE' && (
                      <View
                        style={{
                          ...styles.innerCircle,
                          backgroundColor: isDark ? `#FFF` : `#131313`,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      ...styles.label__gender,
                      color: isDark ? `#FFF` : `#131313`,
                    }}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            name="gender"
          />
        </View>
        <View>
          <Text
            style={{
              ...styles.title__profile,
              color: isDark ? `#FFF` : `#131313`,
            }}>
            Date of birth
          </Text>
          <Text style={styles.label}>B-day</Text>
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
                style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Select bate of birth"
                keyboardType="numeric"
                placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
              />
            )}
            name="dateOfBirth"
          />
          {errors.dateOfBirth && (
            <Text style={styles.error}>{errors.dateOfBirth.message}</Text>
          )}
        </View>
        <View>
          <Text
            style={{
              ...styles.title__profile,
              color: isDark ? `#FFF` : `#131313`,
            }}>
            Account info
          </Text>
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
                  style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Select email"
                  placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
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
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your phone number"
                  placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
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
                  style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your country"
                  placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
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
      {isChangePhoto && (
        <AvatarPicker
          handleCameraLaunch={handleCameraLaunch}
          handleLibraryLaunch={handleLibraryLaunch}
          handleDeletePhoto={handleDeletePhoto}
          setChangePhoto={setChangePhoto}
        />
      )}
    </View>
  );
};

export default Profile;
