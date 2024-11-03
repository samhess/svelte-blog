import { fail, redirect } from '@sveltejs/kit'
import { invalidateSession } from '$lib/server/session.js'

export const actions = {
	default: async ({ locals, cookies }) => {
		const {session} = locals
		if (session) {
			cookies.set('svelteBlog', '', {httpOnly:true, sameSite:'lax', maxAge:0, path:'/'})
			await invalidateSession(session.id)
		} else {
			return fail(401)
		}
		redirect(303, '/')
	}
}
