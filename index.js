import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import reducers from './src/reducers';

const store = createStore(reducers);

const AppRedux: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppRedux);
