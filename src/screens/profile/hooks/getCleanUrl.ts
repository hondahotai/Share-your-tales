const getCleanUrl = (signedUrl: any) => {
  return signedUrl.split('?')[0];
};

export default getCleanUrl;
