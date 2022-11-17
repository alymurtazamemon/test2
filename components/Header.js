import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <div>
            Decentralized Raffle
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
