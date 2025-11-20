import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme, localStorageColorSchemeManager } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css';
import './i18n/config';
import App from './App.tsx';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const colorSchemeManager = localStorageColorSchemeManager({ key: 'mantine-color-scheme' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="light"
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
