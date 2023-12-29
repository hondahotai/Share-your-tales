import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {POST_CREATE} from '../../api/mutations/postCreate.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {styles} from './styles.ts';
import {FormData} from './types.ts';
import {HomeScreenNavigationProp} from './types.ts';
import getSignedUrl from './hooks/getSignedUrl.ts';
import uploadFileToS3 from './hooks/uploadFileToS3.ts';
import getCleanUrl from './hooks/getCleanUrl.ts';
import PostPhotoPicker from '../../components/PostPhotoPicker';
import {
  ARROW_LEFT_BUTTON_BACK,
  BUTTON_BLACK_ARROW_SECOND,
  BUTTON_CROSS_WHITE,
  SOLID_CLOUD_ARROW_UP_WHITE,
} from '../../assets/images';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

const CreatePost: React.FC = () => {
  const [PostCreate, {loading, error, data}] = useMutation(POST_CREATE);
  const {isDark, toggleTheme} = useContext(ThemeContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigationMyPostsScreen = () => {
    navigation.navigate(ScreenNames.MY_POSTS);
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
      }
      if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      if (response.assets && response.assets.length > 0) {
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
      }
      if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      }
      if (response.assets && response.assets.length > 0) {
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
              isDark ? BUTTON_BLACK_ARROW_SECOND : ARROW_LEFT_BUTTON_BACK
            }></Image>
        </TouchableOpacity>
        <Text style={{...styles.title, color: isDark ? `#FFF` : `#131313`}}>
          Create post
        </Text>
        <TouchableOpacity onPress={handleReset}>
          <Image source={BUTTON_CROSS_WHITE}></Image>
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
              source={SOLID_CLOUD_ARROW_UP_WHITE}></Image>
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
        <PostPhotoPicker
          handleCameraLaunch={handleCameraLaunch}
          handleLibraryLaunch={handleLibraryLaunch}
          setUpload={setUpload}
        />
      )}
    </View>
  );
};

export default CreatePost;
