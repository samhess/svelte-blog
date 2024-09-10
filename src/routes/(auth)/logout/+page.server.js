import { fail, redirect } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth'

export const actions = {
	default: async ({ locals, cookies }) => {
		const {session} = locals
		if (session) {
			const {name, value, ...attributes} = lucia.createBlankSessionCookie()
			cookies.set(name, value, {path:'.', ...attributes})
			await lucia.invalidateSession(session.id)
		} else {
			return fail(401)
		}
		redirect(303, '/')
	}
}
