import './index.css'; 
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store/store.js'
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}> 
  <App />
  <Toaster/>
  </Provider>
  </BrowserRouter>,
);
