import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader" // importing the Header() from the component's Header.jsx, after importing we will use it as tag. <Header/>
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Raffle</title>
                <meta name="description" content="Smart contract based raffle application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <LotteryEntrance />
            Hello World!
        </div>
    )
}
