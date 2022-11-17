// https://www.w3schools.com/react/react_components.asp           Components are like functions that return HTML elements.

/**
  function Car() {
    return <h2>Hi, I am a Car!</h2>;
}
*/

// Here we will be creating a little chunk of html that we will export to index.js

import { useMoralis } from "react-moralis" // https://github.com/MoralisWeb3/react-moralis#%EF%B8%8F-quick-start
import { useEffect } from "react"

export default function ManualHeader() {
    // By adding export default we are giving the ability to other codes to use this function
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis() // for authentication and user data

    useEffect(() => {
        // now we are using userEffect
        if (isWeb3Enabled) {
            // if web3Enabled then it will do nothing but return
            return
        } else {
            if (typeof window !== "undefined") {
                // it will check if the window is wallet or not
                if (window.localStorage.getItem("connected")) {
                    // if yes then it will check for the key value in localstorage
                    enableWeb3() // if present then enable
                }
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log(`null account found!`)
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}....{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3() /**after clicking the connect button it will call enableWeb3, after that it will set a key-value pair in local
                        storage to say that we are connected actually when we are connected */
                        if (window !== "undefined") {
                            // here can we write window.ethereum?
                            window.localStorage.setItem("connected", "injected") // The value "injected" will be replaced by other wallet names if we want to
                            // connect those wallets.
                        }
                    }}
                    disabled={isWeb3EnableLoading} // this function is deactivate the button after clicking the connect
                >
                    Connect
                </button>
            )}
        </div>
    )
}

/**
 *  Tool used:
 * 1. Components
 * 2. Moralis [ To use moralis run - yarn add react react-dom moralis-v1 react-moralis]
 * 3. react hook
 * 4. useEffect   https://reactjs.org/docs/hooks-effect.html#example-using-hooks
 */

/**
 * importing the account variable from useMoralis() is used to know the connected account address
 */

// https://stackoverflow.com/questions/62380051/how-do-i-enable-automatic-prettier-formatting-for-jsx-files-in-vs-code
