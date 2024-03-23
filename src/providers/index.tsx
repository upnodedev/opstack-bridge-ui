import WalletProvider from './WalletProvider';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from '@states/store';
import { PersistGate } from 'redux-persist/integration/react';
import ModalProvider from './ModalProvider';

interface Props extends SimpleComponent {
  children: React.ReactNode;
}

function Provider(props: Props) {
  return (
    <WalletProvider>
      <ReduxProvider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <ModalProvider />
        {props.children}
        {/* </PersistGate> */}
      </ReduxProvider>
    </WalletProvider>
  );
}

export default Provider;
