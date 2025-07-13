import {z} from 'zod/v4'
import {zod4} from 'sveltekit-superforms/adapters'

export const authSchema = z.object({
	username: z.string().min(3,'3 characters required'),
	password: z.string().min(5,'5 characters required'),
})

export const postSchema = z.object({
	id: z.number().nonnegative().readonly(),
	title: z.string().min(1,'Missing title'),
	slug: z.string().min(1,'Missing slug'),
	description: z.string().min(1,'Missing description'),
	markdown: z.string().min(10,'Missing markdown'),
	published: z.boolean(),
})

export const authAdapter = zod4(authSchema)
export const postAdapter = zod4(postSchema)
