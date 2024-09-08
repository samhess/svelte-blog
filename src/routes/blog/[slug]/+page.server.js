import {getPost} from '$lib/services/posts'

export const load = async ({ params }) => {
	const post = await getPost(params.slug)
	return {post}
}
