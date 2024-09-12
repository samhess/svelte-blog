import {fail} from '@sveltejs/kit'
import {getPosts, deletePost} from '$lib/services/posts'

export const load = async () => {
	const posts = await getPosts()
	return { posts }
}

export const actions = {
	delete: async ({ url }) => {
		const slug = String(url.searchParams.get('slug'))
		try {
			await deletePost(slug)
		} catch (error) {
			return fail(400)
		}
	},
}
