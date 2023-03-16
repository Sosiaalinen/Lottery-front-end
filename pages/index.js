import Head from "next/head"
import { Inter } from "next/font/google"
import styles from "@component/styles/Home.module.css"
// import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "@component/components/LotteryEntrance"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <div className={styles.description}>
                <Head>
                    <title>Smart Contract Lottery</title>
                    <meta name="description" content="Smart contract lottery" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/* <ManualHeader /> */}
                <Header />
                <LotteryEntrance />
                {/* header / connect button / nav bar */}
            </div>
        </>
    )
}
