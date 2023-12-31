# sabila-mall-fe

Aplikasi Reselling (Jualan Bareng) Terlengkap, Milik Anak Negeri di Indonesia!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Contribution

Developers are strongly suggested to follow these conventions in doing contribution for SabilaMall Project.

1.  Create pull request with title same on the **trello** task
    Example: [Sprint 1] Initiate Project Structure <br />
2.  **Self-assign** your own pull requests <br />
3.  For work in progress or not intended to be reviewed yet, prepend **[WIP]**  
    Example: [WIP] [Sprint 1] Initiate Project Structure  
    Once your work is ready to be reviewed, delete **[WIP]**. <br />
4.  Do not forget to **request review** <br />
5.  Git branching follows these rules:

    - For **features development**, name your branch as "feature/{branch-name}"
    - For **bugfix**, name your branch as "bugfix/{branch-name}"
    - For **test**, name your branch as "test/{branch-name}"

    Be sure to follow the nomenclature correctly in lowercase <br/>
    Example: feature/initiate-project-structure

Next JS and Chakra UI Tips:

1. Use PascalCase for every component name.
2. New page should be inside a folder. The folder will be the route for the page. Use dash (-) if the route contains 2 words or more. Example: "reset-password"
3. Don't create a new component, unless Chakra UI didn't provide it.
4. Same rule for the hooks.
5. Use `Box` element from Chakra UI instead of `div`.
6. To add custom styling, you can create YourComponent.module.scss inside styles folder and import it to your component.
7. Handle every edge case / validation (if needed).
8. Clean Code is a must.
9. DRY.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
