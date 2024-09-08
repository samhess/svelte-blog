// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import('lucia').Session | null
			user: Object<string,any> | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
