import {
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {storage} from '../utils/storage.ts';
import {useMutation} from '@apollo/client';
import {POST_CREATE} from '../apollo/mutations/postCreate.ts';
import {ThemeContext} from '../providers/ThemeContext.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';

type FormData = {
  title: string;
  post: string;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

export const CreatePostScreen = () => {
  const [PostCreate, {loading, error, data}] = useMutation(POST_CREATE);
  const {isDark, toggleTheme} = useContext(ThemeContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigationMyPostsScreen = () => {
    navigation.navigate('MyPosts');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      post: '',
    },
  });

  const [isUpload, setUpload] = useState(false);
  const [selectImage, setSelectImage] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      const response = await PostCreate({
        variables: {
          input: {
            mediaUrl: selectImage,
            description: data.post,
            title: data.title,
          },
        },
      });
      handleNavigationMyPostsScreen();
      reset();
      setSelectImage('');
    } catch (e) {
      console.log(e);
      console.log(1);
      console.log(selectImage);
    }
  };

  const handleLibraryLaunch = async () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    try {
      setUpload(false);
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const fileUri = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        const fileCategory = 'POSTS';

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
      setUpload(false);
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const fileUri = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        const fileCategory = 'POSTS';

        const signedUrl = await getSignedUrl(fileName, fileCategory);
        const uploadFileToServer = await uploadFileToS3(fileUri, signedUrl);
        const cleanUrl = getCleanUrl(signedUrl);
        setSelectImage(cleanUrl);
        console.log(signedUrl);
        console.log(uploadFileToServer);
        console.log(cleanUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            Authorization: `Bearer ${storage.getString('userToken')}`,
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

  const handleReset = () => {
    setSelectImage('');
    reset();
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? `#131313` : `#FFF`,
      }}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={handleNavigationMyPostsScreen}>
          <Image
            source={
              isDark
                ? require('../assets/images/buttonBlackArrowSecond.png')
                : require('../assets/images/ArrowLeftButtonBack.png')
            }></Image>
        </TouchableOpacity>
        <Text style={{...styles.title, color: isDark ? `#FFF` : `#131313`}}>
          Create post
        </Text>
        <TouchableOpacity onPress={handleReset}>
          <Image
            source={require('../assets/images/ButtoncrossWhite.png')}></Image>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.upload__wrapper}
          onPress={() => setUpload(true)}>
          {selectImage ? (
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              source={{uri: selectImage}}></Image>
          ) : (
            <Image
              style={styles.upload}
              source={require('../assets/images/heroicons-solid-cloud-arrow-upW.png')}></Image>
          )}

          {!selectImage && (
            <Text style={{color: isDark ? `#FFF` : `#131313`}}>
              Upload your photo here
            </Text>
          )}
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                placeholder="Enter title of post"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
              />
            </View>
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <Text style={styles.label}>Post</Text>
              <TextInput
                style={{...styles.input, color: isDark ? `#FFF` : `#131313`}}
                placeholder="Enter your post"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={isDark ? `#696969` : `#9B9B9B`}
              />
            </View>
          )}
          name="post"
        />
        {errors.post && <Text>This is required.</Text>}
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: isDark ? `#303030` : `#87B71F`,
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text
            style={{
              ...styles.button__text,
              color: isDark ? `#B8DE64` : `#FFF`,
            }}>
            Publish
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {isUpload && (
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
                ...styles.item__change,
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
              onPress={() => setUpload(false)}>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    flex: 1,
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
  item__text: {
    color: 'rgba(135, 183, 31, 1)',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    flex: 1,
    alignItems: 'center',
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
