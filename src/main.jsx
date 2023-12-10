import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // react-router config
  <BrowserRouter>
    {/* redux config */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
