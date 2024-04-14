//import { handleServerSession } from '@lucia-auth/sveltekit'

//export const load = handleServerSession()

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  const session = event.locals.session
  return {session}
}
