import {storage} from '../../../libs/storage.ts';

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

export default getSignedUrl;
