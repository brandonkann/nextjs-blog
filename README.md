This is a starter template for [Learn Next.js](https://nextjs.org/learn).

A couple of NextJS notes to refer to when creating a new nextjs project
- Global CSS file inside the pages/_app.js file
- CSS files should be named: <name>.module.css
For Navigation Import:
- import Link from 'next/link':
- <Link href="/"> 
- Images:
<Image
    priority
    src="/images/profile.jpg"
    className={utilStyles.borderCircle}
    height={108}
    width={108}
    alt=""
    />

- Pre-Rendering: 
    - Nextjs pre-renders every page,
    - meaning that Next.js generates a HTML file for each page in advance 
- Static Generation and server-side Rendering 
- Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request 
- Server-side rendering: is the pre-rendering method that generates the HTML on each request 

- You can choose which pages are static rendered and server-side rendered: Hybrid Next.js App

- Static Generation is usually recommended since its much faster than having a server render the page on every request 
    - Marketing Pages
    - blog post
    - e-commerce producting listing 
    - Help and Documentation 

- Question you should ask yourself: Can you pre-render this page ahead of a user's request? 
    - If yes, then you should use static generation 
    - Generally server-side rendering is slower but the pre-rendered page will always be up to date 

Static Generation: 
- Static generation with Data using getStaticProps
    - getStaticProps runs at build time in production 
    - In this function you can fetch external data and send it as props to the page 
    - export async function function getStaticProps() {
        // Get External Data from the file system, API, DB, e.c.t

        const data = ...
        // the value of the `props` key will be 
        // passed to the `Home` Component 
        return {
            props: ... 
        }
    }
Note: In development mode, getStaticProps runs on each request instead.
- npm install gray-matter is a library that helps parse YAML front Matter 
In the lib/post.js file you can also:
In this file you could also fetch data from an API by:
// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..');
//     return res.json();
//   }

 <!-- <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnload" // Tells the browser to load this particular script lazily during browser idle time 
            onLoad={() => 
                console.log(`script loaded correctly, window.FB has been populated`)}
        /> -->

// Or query a database directly:
// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }

getStaticProps only runs on the server-side, it will never run on the client side 
- It only can be exported on a page 
- Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.
- Using this is not suitable for data that updates frequently or changes on every user request!!

Sever Side Rendering;
- To use server-side rendering you need to export getServerSideProps

Code Example: 
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}

- only used when data must be fetched at request time 


Client Side Rendering 
- loading parts of the page that don't require data to be loaded
- works well for a user dashboard because its private and not SEO relevant 
- SWR is a hook for client side data fetching 
- it handles caching, revalidation, focus tracking, refetching on interval and more 

import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}


Dynamic URLs:
How to statically Generate Pages with Dynamic routes:
Pages that begin with [ and end with ] are dynamic routes in Next.js 
In that page: we export an async function called getStaticPaths 

- returned list is not just an array of strings, it must be an array of objects 
- useful diagram:https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops
- To render markdown content: we'll use the remark library 

- notes:
    - getStaticPaths, getStaticProps can fetch data from any data source 

export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

getStaticPaths runs on every request, in production it runs at build time 
- fallback = false means any paths not returned by getStaticpaths will request in a 404 
- more about fallbacks in documentation: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false

- catch-all Routes:
    - [...id].js will match /a  /a/b/ /a/b/c

API routes:
https://nextjs.org/docs/api-routes/introduction
- Do not fetch an API route from getStaticProps or getStaticPaths 

Writing Server Side code directly:
https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly

- Good use case for an API Route?
    - Saving incoming data to your database
    - Securely Communicatng with a third-party-api
    - previewing draft content from your CMS 

  
  Develop, Preview, Ship: How to update and push code 
  https://nextjs.org/learn/basics/deploying-nextjs-app/platform-details


  branching with git:

  - Use git branch- checks current branch 
  - git checkout -b <name of the branch>
  - git add . 
  - git status 
  - git commit -m "Added typescript dependencies"
  - git status 
  - git branch 
  - git checkout main 
  - git branch 
  - git merge typescript-implementation
  - git status
  - git log 
