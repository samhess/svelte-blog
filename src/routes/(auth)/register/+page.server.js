import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { authSchema } from '$lib/zod/schema'
import db from '$lib/server/database'

export const load = async ({ locals }) => {
	const {session} = locals
	if (session) redirect(302, '/')

	const form = await superValidate(null, zod(authSchema))
	return { form }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const form = await superValidate(data, zod(authSchema))

		if (form.valid) {
			try {
				const user = await db.user.create({
					data: {
						id: form.data.username,
						username: form.data.username,
						password: form.data.password
					}
				})
				redirect(200, 'login')
			} catch (error) {
				return fail(400, { form })
			}
		} else {
			return fail(400, { form })
		}
	},
}
