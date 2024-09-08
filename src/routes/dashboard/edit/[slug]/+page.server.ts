import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { marked } from 'marked'

import * as posts from '$lib/services/posts'
import { postSchema } from '$lib/zod/schema'

export const load = async ({ params }) => {
	const post = await posts.getPost(params.slug)

	if (!post) {
		error(400, 'Could not find post')
	}

	const form = await superValidate(post, zod(postSchema))
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(postSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const data = {
				...form.data,
				html: await marked.parse(form.data.markdown),
			}
			await posts.updatePost(form.data.slug, data)
		} catch (error) {
			return fail(400, { form })
		}

		redirect(300, '/dashboard')
	},
}
