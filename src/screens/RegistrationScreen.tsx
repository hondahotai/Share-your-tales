import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useState} from 'react';
import {useMutation} from '@apollo/client';
import {SIGN_UP} from '../apollo/mutations/authMutations.ts';
import {storage} from '../utils/storage.ts';
import {Success} from '../components/modules/Success/Success.tsx';
import {ThemeContext} from '../context/ThemeContext.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpRequest = {
  email: string;
  password: string;
  passwordConfirm: string;
};
type HomeScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'Registration'
>;

export const RegistrationScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const [signUp, {loading, error, data}] = useMutation(SIGN_UP);
  const [isError, setError] = useState('');
  const [isSuccess, setSuccess] = useState(true);

  const onSubmit = async (FormData: FormData) => {
    try {
      console.log('Sending', {
        email: FormData.email,
        password: FormData.password,
      });

      const response = await signUp({
        variables: {
          input: {
            email: FormData.email,
            password: FormData.password,
            passwordConfirm: FormData.confirmPassword,
          },
        },
      });

      if (response.data.userSignUp.token) {
        storage.set('userToken', response.data.userSignUp.token);
        console.log(storage.getString('userToken'));
        setSuccess(false);
      } else if (response.data.userSignUp.problem) {
        console.log(response.data.userSignUp.problem.message);
      }
    } catch (e: any) {
      console.log('Authentication error: ' + e);
      setError('Authentication error: ' + e.message);
      setSuccess(true);
    }
  };

  const [isShowPassword, setShowPassword] = useState(false);

  return (
    <>
      {isSuccess ? (
        <View
          style={{
            ...styles.container,
            backgroundColor: isDark ? `#131313` : `#FFF`,
          }}>
          <View>
            <Text style={styles.title}>Join us</Text>
            <Text
              style={{
                ...styles.subtitle,
                color: isDark ? `#FFF` : `#131313`,
              }}>
              You will be able to fully communicate
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      color: isDark ? `#FFF` : `#131313`,
                    }}
                    placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
                    placeholder="Enter your e-mail"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.error}>This is required.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.input__wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      color: isDark ? `#FFF` : `#131313`,
                    }}
                    placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={isShowPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!isShowPassword)}>
                    <Image
                      source={require('../assets/heroicons-mini-eye.png')}
                      style={styles.icon}></Image>
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.error}>This is required.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.input__wrapper}>
                  <Text style={styles.label}>Confirm password</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      color: isDark ? `#FFF` : `#131313`,
                    }}
                    placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
                    placeholder="Confirm your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={isShowPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!isShowPassword)}>
                    <Image
                      source={require('../assets/heroicons-mini-eye.png')}
                      style={styles.icon}></Image>
                  </TouchableOpacity>
                </View>
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.error}>This is required.</Text>
            )}
            <Text style={styles.error}>{isError}</Text>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{...styles.login, color: isDark ? `#FFF` : `#131313`}}>
                  Already have an account?
                  <Text style={styles.login__text}> Log in</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continue}>
                <Text
                  onPress={handleSubmit(onSubmit)}
                  style={styles.continue__text}>
                  continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Success />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 118,
    justifyContent: 'space-around',
    backgroundColor: `#FFF`,
  },
  title: {
    fontSize: 32,
    color: `rgba(184, 222, 100, 1)`,
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  subtitle: {
    letterSpacing: 0.48,
    fontSize: 16,
    color: `rgba(19, 19, 19, 1)`,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  login: {color: `#000000`, textAlign: 'center'},
  login__text: {
    color: `rgba(184, 222, 100, 1)`,
  },
  continue: {
    borderRadius: 21,
    backgroundColor: `rgba(135, 183, 31, 1)`,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 45,
    marginTop: 20,
    width: 343,
  },
  continue__text: {
    color: `#FFF`,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#131313',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  bottomContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  error: {
    color: `rgba(194, 83, 76, 1)`,
  },
  input__wrapper: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    zIndex: 1000,
    top: -50,
    right: 0,
  },
  container__success: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: `#FFF`,
  },
  text__success: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 26,
    marginBottom: 52,
  },
  image__success: {
    position: 'absolute',
    left: -25,
    width: 18,
    height: 18,
  },
  label: {
    color: '#9B9B9B',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 16,
  },
});
