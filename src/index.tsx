import Providers from 'components/Providers';
import { register } from 'pwa';
import ReactDOM from 'react-dom';
import App from './app';
import './app.global.css';

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root'),
);

register();
