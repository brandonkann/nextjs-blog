import Butter from 'buttercms';
const butter = Butter(process.env.CMS_API_KEY)

const postsPageSize = 10;

export async function getAllPostsPaginated(pageSize = postsPageSize) {
    const paginatedPosts = [];
    let currentPage = 1;
    while (!!currentPage) {
        const pagePostsData = await getPostsData(currentPage, pageSize);
        paginatedPosts[currentPage - 1] = pagePostsData.posts;
        currentPage = pagePostsData.nextPage;
    }
    return paginatedPosts;
}

export async function getPostsData(page = 1, pageSize = postsPageSize) {
    const response = await butter.post.list({
        page_size: pageSize,
        page: page,
    });

    return {
        posts: response.data.data,
        prevPage: response.data.meta.previous_page,
        nextPage: response.data.meta.next_page,
    };
}

export async function getPost(slug) {
    const response = await butter.post.retrieve(slug);
    const post = await response.data;
    return post
}

