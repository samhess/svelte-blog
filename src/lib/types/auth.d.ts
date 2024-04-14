import {lucia} from '$lib/server/auth'

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: {
			email: string
		}
	}
}

export {}