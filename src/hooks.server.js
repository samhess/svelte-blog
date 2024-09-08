import { lucia } from '$lib/server/auth'
import { error } from '@sveltejs/kit'

export const handle = async ({event, resolve}) => {
	console.log(`${event.request.method} ${event.url.pathname}`)

	const sessionId = event.cookies.get(lucia.sessionCookieName)
	if (sessionId) {
		const {session, user} = await lucia.validateSession(sessionId)
		event.locals.session = session
		event.locals.user = user
		if (!session) {
			const {name, value, ...attributes} = lucia.createBlankSessionCookie()
			event.cookies.set(name, value, {path: "/", ...attributes})
		} else if (session.fresh) {
			const {name, value, ...attributes} = lucia.createSessionCookie(session.id)
			event.cookies.set(name, value, {path: "/", ...attributes})
		}
		return resolve(event)
	} else {
		event.locals.session = null
		event.locals.user = null
		const path = event.url.pathname
		if (path.startsWith('/api')) {
			if (path.startsWith('/api/auth') || path.startsWith('/api/quote') || path.startsWith('/api/lookup')) {
				return resolve(event)
			} else {
				return error(401)
			}
		} else {
			return resolve(event)
		}
	}
}
