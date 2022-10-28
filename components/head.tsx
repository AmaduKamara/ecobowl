import Head from "next/head"
import { useSelector } from "react-redux";
import { appStore } from "../redux/app/selector";

export const HeadTitle = (props) => {
    const {title} = props;

    const app = useSelector((state: any) => appStore(state));

    return <Head>
        <title>{title} - {app.name} | Goods & Services | Eazibiz</title>
        <meta name="description" content={`${app} goods & services management`} />
        <meta name="keyword" content={`${app} product, goods & services management`} />
        <link rel="icon" href="/favicon.ico" />
    </Head>
}