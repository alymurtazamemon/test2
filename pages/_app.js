import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import {NotificationProvider} from "@web3uikit/core"      // https://github.com/web3ui/web3uikit/blob/master/packages/core/README.md#notification-

function MyApp({ Component, pageProps }) {               //   https://github.com/MoralisWeb3/react-moralis#wrap-your-app-in-a-moralisprovider 
    return (
    <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
        <Component {...pageProps} />
        </NotificationProvider>
    </MoralisProvider>
    )
}

export default MyApp

/**
 * Tool used:
 * Moralis
 *
 */
