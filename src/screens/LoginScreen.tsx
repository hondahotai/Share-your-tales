import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useState} from 'react';
import {storage} from '../utils/storage.ts';
import {useMutation} from '@apollo/client';
import {SIGN_IN} from '../apollo/mutations/authMutations.ts';

type FormDataLogin = {
  email: string;
  password: string;
};

type SignInRequest = {
  email: string;
  password: string;
};

export const LoginScreen = ({navigation}: any) => {
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
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>
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
            <TextInput
              style={styles.input}
              placeholder="Enter your e-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
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
              <TextInput
                style={styles.input}
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
        {errors.password && <Text style={styles.error}>This is required.</Text>}
        <Text style={styles.error}>{isError}</Text>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Registration');
            }}>
            <Text style={styles.login}>
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
    paddingRight: 40,
    paddingLeft: 10,
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
});
