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
        toastClassName="whitespace-pre-wrap w-[350px] sm:w-[450px] items-start"
      />

      <Component {...pageProps} />
    </AppLayout>
  );
};

export default MyApp;
