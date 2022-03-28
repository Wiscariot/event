import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import loginReducer from '../reducers/loginReducer'

function MyApp({ Component, pageProps }: AppProps) {
  const store = createStore(loginReducer)

  return (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
