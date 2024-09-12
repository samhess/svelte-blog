import { error, redirect } from '@sveltejs/kit'
import { actionResult, superValidate } from 'sveltekit-superforms/server'
import { marked } from 'marked'
import { getPost, updatePost } from '$lib/services/posts'
import { postAdapter } from '$lib/zod/schema'

export const load = async ({ params }) => {
	const post = await getPost(params.slug)
	if (post) {
		const form = await superValidate(post, postAdapter)
		return { form }
	} else {
		error(400, 'Could not find post')
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, postAdapter)
		
		if (form.valid) {
				const data = {
					...form.data,
					html: await marked.parse(form.data.markdown),
				}
				await updatePost(form.data.slug, data)
				redirect(303, '/dashboard')
		} else {
			actionResult('failure', { form })
		}
	}
}
