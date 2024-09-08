import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { postSchema } from '$lib/zod/schema'
import { parse } from 'marked'
import { createPost } from '$lib/services/posts'


export const load = async (event) => {
	const form = await superValidate(null, zod(postSchema))
	return { form }
}

export const actions = {
	default: async ({request}) => {
		const data = await request.formData()
		const form = await superValidate(data, zod(postSchema))

		if (form.valid) {
			try {
				const data = {
					...form.data,
					html: await parse(form.data.markdown),
				}
			} catch (error) {
				return fail(400, { form })
			}
			await createPost(data)
			redirect(200, '/dashboard')
		} 
		else {
			return fail(400, { form })
		}
	}
}
