import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'

import { lucia } from '$lib/server/auth'
import { authSchema } from '$lib/zod/schema'

export const load = async ({ locals }) => {
	if (locals.session) redirect(302, '/');

	const form = await superValidate(zod(authSchema))
	return { form }
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData()
		const form = await superValidate(data,zod(authSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			locals.session = await lucia.createSession('userId',{})
		} catch (error) {
			return fail(400, { form })
		}
	},
}
