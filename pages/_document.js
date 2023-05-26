import Document, { Html, Head, Main, NextScript } from "next/document";

import { FB_PIXEL_ID } from "../lib/fpixel";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                        />
                    </noscript>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-H6SK2YX4YK"></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){
                            dataLayer.push(arguments);
                            }
                            gtag('js', new Date());

                            gtag('config', 'G-H6SK2YX4YK');
                        `}}>
                    </script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
