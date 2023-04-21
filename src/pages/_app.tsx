import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import AppLayout from '@/layouts/app-layout/AppLayout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppLayout>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />

      <Component {...pageProps} />
    </AppLayout>
  );
};

export default MyApp;
