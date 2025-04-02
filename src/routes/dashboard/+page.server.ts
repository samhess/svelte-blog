import {fail} from '@sveltejs/kit'
import {getPosts, deletePost} from '$lib/services/posts'

export const load = async () => {
	const posts = await getPosts()
	return { posts }
}

export const actions = {
	delete: async ({url}) => {
		const slug = url.searchParams.get('slug') as string
		try {
			await deletePost(slug)
		} catch (error) {
			return fail(400)
		}
	},
}
