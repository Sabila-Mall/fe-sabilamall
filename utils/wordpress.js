// /utils/wordpress.js

const BASE_URL = 'https://lp.sabilamall.co.id/wp-json/wp/v2';

export async function getPosts() {
    const postsRes = await fetch(BASE_URL + '/posts?_embed');
    const posts = await postsRes.json();
    return posts;
}
export async function getPost(slug) {
    const posts = await getPosts();
    const postArray = posts.filter((post) => post.slug == slug);
    const post = postArray.length > 0 ? postArray[0] : null;
    return post;
}

export async function getPages() {
    const pagesRes = await fetch(BASE_URL + '/pages?_embed');
    const pages = await pagesRes.json();
    return pages;
}
export async function getPage(slug) {
    const pages = await getPages();
    const pageArray = pages.filter((page) => page.slug == slug);
    const page = pageArray.length > 0 ? pageArray[0] : null;
    return page;
}

export async function getEvents() {
    const eventsRes = await fetch(BASE_URL + '/events?_embed');
    const events = await eventsRes.json();
    return events;
}

export async function getEvent(slug) {
    const events = await getEvents();
    const eventArray = events.filter((event) => event.slug == slug);
    const event = eventArray.length > 0 ? eventArray[0] : null;
    return event;
}

export async function getSlugs(type) {
    let elements = [];
    switch (type) {
        case 'posts':
            elements = await getPosts();
            break;
        case 'pages':
            elements = await getPages();
            break;
        case 'events':
            elements = await getEvents();
            break;
    }
    const elementsIds = elements.map((element) => {
        return {
            params: {
                slug: element.slug,
            },
        };
    });
    return elementsIds;
}