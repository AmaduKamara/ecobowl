import Head from "next/head";

export const HeadTitle = (props) => {
    const { title } = props;

    return <Head>
        <title>{title} | Ecobowl</title>
        <meta name="description" content='entrepreneurs and business managemnt' />
        <meta name="keyword" content='entrepreneurs and business managemnt' />
        <link rel="icon" href="/favicon.ico" />
    </Head>
}