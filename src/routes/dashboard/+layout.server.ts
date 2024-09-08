import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const {session} = locals
	if (!session) redirect(302, '/login')
}
