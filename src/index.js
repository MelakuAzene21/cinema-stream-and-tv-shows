import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.js';
import { store } from './features/store';
import { ThemeProvider } from './context/ThemeContext.js';
import './App.css'
import LanguageProvider from './component/LanguageContext.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

