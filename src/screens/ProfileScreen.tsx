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
import {useContext, useEffect, useState} from 'react';
import {birthValidation} from '../services/birthValidation.ts';
import {emailValidation} from '../services/emailValidation.ts';
import {phoneValidation} from '../services/phoneValidation.ts';
import {USER_ME} from '../apollo/queries/userQueries.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MMKV} from 'react-native-mmkv';
import {storage} from '../utils/storage.ts';
import {ThemeContext} from '../providers/ThemeContext.tsx';
import {RootStackParamList} from '../types/types.ts';

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
type FormData = {
  firstName: string;
  lastName: string;
  surName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  number: string;
  country: string;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
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
    navigation.navigate('Main');
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
      navigation.navigate('Main');
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
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
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
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
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

  const handleDeletePhoto = async () => {
    const apiUrl =
      'https://internship-social-media.purrweb.com/v1/aws/delete-s3-file';
    try {
      const response = await fetch(
        `${apiUrl}?fileCategory=AVATARS&fileKey=${encodeURIComponent(
          selectImage,
        )}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        setSelectImage(null);
        setChangePhoto(false);
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const token = storage.getString('userToken');

  const getSignedUrl = async (fileName: any, fileCategory: any) => {
    const apiUrl =
      'https://internship-social-media.purrweb.com/v1/aws/signed-url';

    try {
      const response = await fetch(
        `${apiUrl}?fileName=${encodeURIComponent(
          fileName,
        )}&fileCategory=${encodeURIComponent(fileCategory)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        return response.text();
      }
    } catch (error) {
      console.error('Error getting signed URL:', error);
      throw error;
    }
  };

  const uploadFileToS3 = async (fileUri: any, signedUrl: any) => {
    try {
      const file = await fetch(fileUri);
      const blob = await file.blob();

      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': 'image/png',
        },
      });

      if (!response.ok) {
        new Error('Failed to upload image to S3');
      }
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw error;
    }
  };

  const getCleanUrl = (signedUrl: any) => {
    return signedUrl.split('?')[0];
  };

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
              isDark
                ? require('../assets/images/buttonBlackArrowSecond.png')
                : require('../assets/images/ArrowLeftButtonBack.png')
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
              source={
                selectImage
                  ? {uri: selectImage}
                  : require('../assets/images/StateEmptyUserBig.png')
              }
              style={styles.photo__image}></Image>
            <Image
              style={styles.photo__icon}
              source={
                isDark
                  ? require('../assets/images/DMButtonPhotoBlack.png')
                  : require('../assets/images/DMButtonPhoto.png')
              }></Image>
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
        <View style={styles.overlay}>
          <View style={styles.photo__change}>
            <TouchableOpacity
              style={{
                ...styles.item__change,
                backgroundColor: isDark ? `#131313` : `#FFF`,
              }}
              onPress={handleCameraLaunch}>
              <Text style={styles.item__text}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.item__changeBorder,
                backgroundColor: isDark ? `#131313` : `#FFF`,
              }}
              onPress={handleLibraryLaunch}>
              <Text style={styles.item__text}>Choose from the library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.item__change,
                backgroundColor: isDark ? `#131313` : `#FFF`,
              }}
              onPress={handleDeletePhoto}>
              <Text style={styles.item__textRed}>Delete photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.item__cancel,
                backgroundColor: isDark ? `#131313` : `#FFF`,
              }}
              onPress={() => setChangePhoto(false)}>
              <Text style={styles.item__text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    flex: 1,
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
