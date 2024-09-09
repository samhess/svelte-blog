import { redirect } from '@sveltejs/kit'
import { actionResult, superValidate } from 'sveltekit-superforms/server'
import { postAdapter } from '$lib/zod/schema'
import { parse } from 'marked'
import { createPost } from '$lib/services/posts'

export const load = async (event) => {
	const form = await superValidate(null, postAdapter)
	return { form }
}

export const actions = {
	default: async ({request}) => {
		const data = await request.formData()
		const form = await superValidate(data, postAdapter)
		console.log(form);
		
		if (form.valid) {
			const data = {
				...form.data,
				html: await parse(form.data.markdown),
			}
			await createPost(data)
			redirect(303, '/dashboard')
		} 
		else {
			return actionResult('failure', { form })
		}
	}
}
