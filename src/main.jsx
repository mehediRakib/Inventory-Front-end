import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/css/index.css'
import {Provider} from "react-redux";
import {store} from "./Redux/store/store.js";
import '../src/assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
       <App />
   </Provider>
  </StrictMode>,
)
