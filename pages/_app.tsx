import { QueryClient, QueryClientProvider, } from 'react-query'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css' 
import 'react-toastify/dist/ReactToastify.css';
import 'src/styles/globals.scss'
import type { AppProps } from 'next/app'
import PostMessageIframe from 'src/components/organisms/Auth/PostMessageIframe'
const queryClient = new QueryClient()
import { AuthProvider } from 'src/components/organisms/Auth/AuthContext'
import { GlobalProvider } from 'src/components/organisms/Global/GlobalContext'
import GlobalCssEmotion from 'src/components/organisms/Global/GlobalCssEmotion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <PostMessageIframe />
          <GlobalCssEmotion />
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthProvider>
    </GlobalProvider>
  )
}
export default MyApp
