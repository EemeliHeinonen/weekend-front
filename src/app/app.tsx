import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import styles from './app.module.css';
import MainView from './pages/MainView/MainView';

const SOCKET_URL = 'http://localhost:4200/ws-message';

const handleSocketConnect = () => {
  console.log('Connected to websocket');
};

export function App() {
  return (
    <>
      <StompSessionProvider
        url={SOCKET_URL}
        onConnect={handleSocketConnect}
        onDisconnect={() => {
          console.log('Websocket disconnected');
        }}
      >
        <MainView />
      </StompSessionProvider>
      <div />
    </>
  );
}

export default App;
