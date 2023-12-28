import React from 'react';

export type IAvatar = {
  handleCameraLaunch: () => void;
  handleLibraryLaunch: () => void;
  handleDeletePhoto: () => void;
  setChangePhoto: React.Dispatch<boolean>;
};
