import db from '$lib/server/database'
import { error } from '@sveltejs/kit'

export async function getPosts() {
	return await db.post.findMany({
		select: {
			createdAt: true,
			slug: true,
			title: true,
			published: true,
		},
		orderBy: { createdAt: 'desc' }
	})
}

export async function getPublishedPosts() {
	return await db.post.findMany({
		where: { published: true },
		select: {
			createdAt: true,
			slug: true,
			title: true,
			description: true,
		},
		orderBy: { createdAt: 'desc' },
		take: 10,
	})
}

export async function getPost(slug='') {
	const post = await db.post.findUnique({
		where: { slug },
		select: {
			id: true,
			title: true,
			slug: true,
			description: true,
			markdown: true,
			html: true,
			published: true,
		},
	})

	if (!post) {
		error(400, `Could not find “${slug}”`)
	}

	return post
}

/**
 * @param {*} data 
 */
export async function createPost(data) {
	await db.post.create({ data })
}

/**
 * @param {*} data 
 */
export async function updatePost(id=1, data) {
	return await db.post.update({
		where: { id },
		data,
	})
}

export async function deletePost(slug='') {
	await db.post.delete({ where: { slug } })
}
