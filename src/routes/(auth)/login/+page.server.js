import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { authAdapter } from '$lib/zod/schema'
import { generateSessionToken, createSession } from '$lib/server/session.js'
import db from '$lib/server/database'

export const load = async ({ locals }) => {
	const {session} = locals
	if (session) redirect(302, '/')

	const form = await superValidate(null, authAdapter)
	return { form }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const form = await superValidate(data,authAdapter)
		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const {data} = form
			const user = await db.user.findUnique({where:{username:data.username}})
			if (user) {
				const token = generateSessionToken()
				const session = await createSession(token, user.username)
				cookies.set('svelteBlog', token, {httpOnly:true, sameSite:'lax', expires:session.expiresAt, path:'/'})
			} else {
				return fail(400, {message:'email and password do not match'})
			}
		} catch (error) {
			return fail(400, { form })
		}
	},
}
