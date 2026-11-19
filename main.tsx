
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './weight_gain_tracker_Base';
import './style.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
