import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { marked } from 'marked'
import { getPost, updatePost } from '$lib/services/posts'
import { postSchema } from '$lib/zod/schema'

export const load = async ({ params }) => {
	const post = await getPost(params.slug)
	if (post) {
		const form = await superValidate(post, zod(postSchema))
		return { form }
	} else {
		error(400, 'Could not find post')
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(postSchema))
		if (form.valid) {
				const data = {
					...form.data,
					html: await marked.parse(form.data.markdown),
				}
				await updatePost(form.data.slug, data)
		} else {
			return fail(400, { form })
		}
		redirect(300, '/dashboard')
	}
}
