import { fail, redirect } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth'

export const actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) return fail(401)
		const sessionId = cookies.get(lucia.sessionCookieName) ?? ''
		await lucia.invalidateSession(sessionId)
		locals.session = null

		redirect(303, '/');
	},
}
