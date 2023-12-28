import React from 'react';

export type IPostPhotoPicker = {
  handleCameraLaunch: () => void;
  handleLibraryLaunch: () => void;
  setUpload: React.Dispatch<boolean>;
};
