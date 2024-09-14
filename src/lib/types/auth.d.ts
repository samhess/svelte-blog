import {lucia} from '$lib/server/auth'

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: {
			name: string
			username: string
		}
	}
}

export {}