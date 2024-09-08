import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { lucia } from '$lib/server/auth'
import { authSchema } from '$lib/zod/schema'
import db from '$lib/server/database'

export const load = async ({ locals }) => {
	const {session} = locals
	if (session) redirect(302, '/')

	const form = await superValidate(zod(authSchema))
	return { form }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const form = await superValidate(data,zod(authSchema))
		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const {data} = form
			const user = await db.user.findUnique({where:{username:data.username}})
			if (user) {
				const session = await lucia.createSession(user.id, {})
				const {name, value, ...attributes} = lucia.createSessionCookie(session.id)
				cookies.set(name, value, {path: "/", ...attributes})
			} else {
				return fail(400, {message:'email and password do not match'})
			}
		} catch (error) {
			return fail(400, { form })
		}
	},
}
