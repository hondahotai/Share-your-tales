import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useState} from 'react';
import {storage} from '../../libs/storage.ts';
import {useMutation} from '@apollo/client';
import {SIGN_IN} from '../../api/mutations/authMutations.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles.ts';
import {FormDataLogin} from './types.ts';
import {SignInRequest} from './types.ts';
import {ScreenNavigationProp} from './types.ts';

const Login = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormDataLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const [signIn, {loading, error, data}] = useMutation(SIGN_IN);

  const [isShowPassword, setShowPassword] = useState(false);
  const [isError, setError] = useState('');

  const onSubmit = async (formData: SignInRequest) => {
    try {
      console.log('Sending', {
        email: formData.email,
        password: formData.password,
      });

      const response = await signIn({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      if (response.data.userSignIn.token) {
        storage.set('userToken', response.data.userSignIn.token);
        console.log(storage.getString('userToken'));
        navigation.navigate('Main');
        reset();
      } else if (response.data.userSignIn.problem) {
        console.log(response.data.userSignIn.problem.message);
      }
    } catch (e: any) {
      console.log('Authentication error: ' + e);
      setError('Authentication error: ' + e.message);
    }
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? `#131313` : `#FFF`,
      }}>
      <View>
        <Text style={styles.title}>Log in</Text>
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
                style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
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
        {errors.email && <Text style={styles.error}>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.input__wrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
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
        {errors.password && <Text style={styles.error}>This is required.</Text>}
        <Text style={styles.error}>{isError}</Text>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Registration');
            }}>
            <Text style={{...styles.login, color: isDark ? `#FFF` : `#131313`}}>
              No account?
              <Text style={styles.login__text}> Register</Text>
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
  );
};

export default Login;
