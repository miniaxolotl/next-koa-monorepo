import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { useTheme } from '@themes/ThemeProvider';

const Index = () => {
  return (
    <DefaultLayout>
      <div className="container">page content</div>
    </DefaultLayout>
  );
};

export default Index;