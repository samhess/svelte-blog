import db from '$lib/server/database'
import {error} from '@sveltejs/kit'

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

export async function getPost(slug:string) {
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

export async function createPost(data:any) {
	await db.post.create({data})
}

export async function updatePost(post:any) {
	const {id, ...data} = post
	console.log(data)
	return await db.post.update({
		where: {id},
		data,
	})
}

export async function deletePost(slug:string) {
	await db.post.delete({where:{slug}})
}
