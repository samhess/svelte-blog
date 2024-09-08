import { fail, redirect } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth'

export const actions = {
	default: async ({ locals, cookies }) => {
		const {session} = locals
		if (!session) return fail(401)

		await lucia.invalidateSession(session.id)
		const {name, value, ...attributes} = lucia.createBlankSessionCookie()
    cookies.set(name, value, {path:'.', ...attributes})
		redirect(303, '/')
	},
}
