import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Main from './components/main/Main';
import { enableMapSet } from 'immer';

enableMapSet();

const App: React.FunctionComponent<Record<string, never>> = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
