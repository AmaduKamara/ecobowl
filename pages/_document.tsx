import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#fff" />
                    <meta name="title" content="Easybiz" />
                    <meta name="description" content="Easybiz" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/icon.png"></link>
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
                    <link rel="mask-icon" href="/favicon.ico" color="#3b82f6" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;


