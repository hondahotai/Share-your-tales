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

export default uploadFileToS3;
