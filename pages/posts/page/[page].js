import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostsData, getAllPostsPaginated } from "../../../lib/api";
import utilStyles from '../../../styles/utils.module.css';
import { Container } from "@mui/system";

export default function Posts({ posts, prevPage, nextPage }) {
    const router = useRouter();
    if (!router.isFallback && !posts) {
        return <ErrorPage statusCode={404} />;
    }
    return router.isFallback ? (
        <div>Loading…</div>
    ) : (
        <div>
            <Container>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}></ul>
            {posts.map((post, key) => {
                return (
            <li className={utilStyles.listItem}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <br />
           
          </li>
           )})}
      </section>
      </Container>
            
    

            <div>
                {prevPage && (
                    <Link href={`/posts/page/${prevPage}`}>
                        Prev
                    </Link>
                )}
                {nextPage && (
                    <Link href={`/posts/page/${nextPage}`}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const page = parseInt(params.page, 10);
    const { posts, prevPage, nextPage } = await getPostsData(page);

    return {
        props: { posts, prevPage, nextPage },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsPaginated();
    const paths = Object.keys(allPosts).map(
        (pageIndex) => `/posts/page/${parseInt(pageIndex, 10) + 1}`
    );

    return {
        paths,
        fallback: true,
    };
}