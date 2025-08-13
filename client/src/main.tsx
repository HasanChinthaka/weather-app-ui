import './index.css'
import App from './App.tsx'
import Layout from './components/Layout.tsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout>
      <ToastContainer />
      <App />
    </Layout>
  </BrowserRouter>,
)
