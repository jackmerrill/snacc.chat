import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'next-auth/client'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;