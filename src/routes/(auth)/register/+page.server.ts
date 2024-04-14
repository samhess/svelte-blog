import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { lucia } from '$lib/server/auth'
import { authSchema } from '$lib/zod/schema'

export const load = async ({ locals }) => {
	if (locals.session) redirect(302, '/');

	const form = await superValidate(null, zod(authSchema))
	return { form }
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData()
		const form = await superValidate(data, zod(authSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const user = await prisma.user.create({
				data: {
					id: '4',
					username: form.data.username
				}
			})
			locals.session = await lucia.createSession(user.id,{})
		} catch (error) {
			return fail(400, { form })
		}
	},
}
