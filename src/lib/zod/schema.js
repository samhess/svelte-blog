import { z } from 'zod'

export const authSchema = z.object({
	username: z.string().min(3,'3 characters required'),
	password: z.string().min(5,'5 characters required'),
})

export const postSchema = z.object({
	title: z.string().min(1,'Missing title'),
	slug: z.string().min(1,'Missing slug'),
	description: z.string().min(1,'Missing description'),
	markdown: z.string().min(1,'Missing markdown'),
	published: z.boolean(),
})
