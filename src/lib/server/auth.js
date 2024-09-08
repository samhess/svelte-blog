import { Lucia, TimeSpan } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'

import prisma from './database'

export const lucia = new Lucia(new PrismaAdapter(prisma.session, prisma.user), {
	sessionExpiresIn: new TimeSpan(1, 'd'),
	sessionCookie: {
		name: 'SvelteBlogSession',
		attributes: {
			path: "/",
			secure: !dev,
			sameSite: 'lax'
		}
	},
	getUserAttributes: ({id,name,username}) => {
		return {
			userId: id,
			name: name,
			username: username
		}
	}
})
