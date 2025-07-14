import "./globals.css"
//internal import 

import { Navbar,Footer } from "../Components";
import { CrowdFundingProvider } from '../Context/CrowdFundingContext';




export default function App({ Component, pageProps }) {
  return (
  <>
  <CrowdFundingProvider>
  <Navbar/>
  <Component {...pageProps} />
  <Footer/>
  </CrowdFundingProvider>
  </>
  
  )
  
  
}