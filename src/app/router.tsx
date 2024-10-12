import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from '@kobalte/core';
import { Route, Router } from '@solidjs/router';
import { Component } from 'solid-js';

import { HomePage } from '@/pages/home-page';

export const AppRouter: Component = () => {
  const storageManager = createLocalStorageManager('vite-ui-theme');

  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            {props.children}
          </ColorModeProvider>
        </>
      )}
    >
      <Route path='*'>
        <Route path='/' component={HomePage} />
      </Route>
    </Router>
  );
};