import * as React from 'react';
import { AppRegistry } from 'react-native';
import { ThemeProvider } from 'react-native-ios-kit';
import App from './App'; 
import { name as appName } from './app.json';
import Root from './Root';

function Main() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
