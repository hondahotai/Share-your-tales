import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useState} from 'react';
import {useMutation} from '@apollo/client';
import {SIGN_UP} from '../../api/mutations/authMutations.ts';
import {storage} from '../../libs/storage.ts';
import Success from '../../components/Success';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {styles} from './styles.ts';
import {FormData} from './types.ts';
import {HomeScreenNavigationProp} from './types.ts';

const Registration = () => {
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
                      source={require('../../assets/images/heroicons-mini-eye.png')}
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
                      source={require('../../assets/images/heroicons-mini-eye.png')}
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

export default Registration;
