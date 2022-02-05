import React from 'react';

import { Text } from '@chakra-ui/react';

import { useThemeMode } from '@themes/ThemeProvider';
import { AppStoreEnum, AuthStore, useDispatch, useStore } from '@stores/AppState';

const Index = () => {
  const { toggleTheme } = useThemeMode();
  const auth = useStore(AppStoreEnum.auth) as AuthStore;
  useDispatch({ [AppStoreEnum.auth]: { token: '123' } });
  console.log(auth);

  return (
    <div className="container sm columns-3">
      <Text onClick={() => toggleTheme()}>Hello World</Text>
    </div>
  );
};

export default Index;
