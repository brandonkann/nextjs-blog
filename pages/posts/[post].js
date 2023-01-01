import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPost, getAllPostsPaginated } from "../../lib/api";


export default function Post({ post }) {
    const router = useRouter();
    if (!router.isFallback && !post) {
        return <ErrorPage statusCode={404} />;
    }
    
    return router.isFallback ? (
        <div>Loading…</div>
    ) : (
        <div>
            
            <h1>{post.data.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.data.body }} />
        </div>
    );
}

export async function getStaticProps({ params }) {
    const post = await getPost(params.post);
    return {
        props: {
            post,
        },
    };
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsPaginated(100);
    const paths = Object.entries(allPosts).reduce((res, [_, posts]) => {
        const pagePaths = posts.map((post) => `/posts/${post.slug}`);
        return [...res, ...pagePaths];
    }, []);

    return {
        paths,
        fallback: true,
    };
}