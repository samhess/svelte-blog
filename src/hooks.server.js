import { validateSessionToken } from '$lib/server/session'
import { error } from '@sveltejs/kit'

export const handle = async ({event, resolve}) => {
	console.log(`${event.request.method} ${event.url.pathname}`)

	const token = event.cookies.get('svelteBlog')
	if (token) {
		const {session, user} = await validateSessionToken(token)
		event.locals.session = session
		event.locals.user = user
		if (session) {
			event.cookies.set('svelteBlog', token, {httpOnly:true, sameSite:'lax', expires:session.expiresAt, path:'/'})
		} else {
			event.cookies.set('svelteBlog', '', {httpOnly:true, sameSite:'lax', maxAge:0, path:'/'})
		}
		return resolve(event)
	} else {
		event.locals.session = null
		event.locals.user = null
		const path = event.url.pathname
		if (path.startsWith('/api')) {
			if (path.startsWith('/api/oauth')) {
				return resolve(event)
			} else {
				return error(401)
			}
		} else {
			return resolve(event)
		}
	}
}
