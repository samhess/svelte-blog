import {getPublishedPosts} from '$lib/services/posts'

export const load = async () => {
	return { posts: await getPublishedPosts() }
}