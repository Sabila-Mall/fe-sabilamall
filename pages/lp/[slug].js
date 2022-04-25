// /pages/[slug].js

import Link from 'next/link';
import Head from 'next/head';

import { getPage, getSlugs } from '../../utils/wordpress';

export default function PostPage({ page }) {
    return (
        <><head>
            <link rel='stylesheet' id='elementor-frontend-css' href='https://lp.sabilamall.co.id/wp-content/themes/landingpress-wp/addons/elementor/assets/css/frontend.min.css?ver=1.9.8.2-LP' type='text/css' media='all' />
            <link rel='stylesheet' id='landingpress-css' href='https://lp.sabilamall.co.id/wp-content/themes/landingpress-wp/style.css?ver=2.9.11' type='text/css' media='all' />

        </head>
            <div className="container pt-5">
                <h1 className="text-center pb-5">{page.title.rendered}</h1>
                <div
                    className="card-text pb-5"
                    dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                ></div>
                <Link href="/">
                    <a className="btn btn-primary">Back to Home</a>
                </Link>
            </div>

        </>
    );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
    const paths = await getSlugs('pages');

    return {
        paths,
        //this option below renders in the server (at request time) pages that were not rendered at build time
        //e.g when a new blogpage is added to the app
        fallback: 'blocking',
    };
}

//access the router, get the id, and get the data for that page
export async function getStaticProps({ params }) {
    const page = await getPage(params.slug);

    return {
        props: {
            page,
        },
        revalidate: 10, // In seconds
    };
}