import {storage} from '../../../libs/storage.ts';
import React from 'react';

export const useDeletePhoto = (
  selectImage: string | null,
  setSelectImage: React.Dispatch<string | null>,
  setChangePhoto: React.Dispatch<boolean>,
) => {
  return async () => {
    if (!selectImage) {
      return;
    }
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
            authorization: `Bearer ${storage.getString('userToken')}`,
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
};
