import {getPublishedPosts} from '$lib/services/posts'

export const load = async () => {
	const posts =  await getPublishedPosts()
	return {posts}
}
