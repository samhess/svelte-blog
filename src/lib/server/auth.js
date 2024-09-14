import { Lucia, TimeSpan } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'
import { GitHub, Google } from 'arctic'
import { 
	GITHUB_CLIENT_ID, 
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID, 
	GOOGLE_CLIENT_SECRET
} from '$env/static/private'
import prisma from './database'

export const lucia = new Lucia(new PrismaAdapter(prisma.session, prisma.user), {
	sessionExpiresIn: new TimeSpan(1, 'd'),
	sessionCookie: {
		name: 'svelteBlog',
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

const redirectBase = 'http://localhost:5173/api/oauth'
/** @type {Object<string,any>} */
export const providers = {
	github: {
		name: 'GitHub',
		arctic: new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
			redirectURI:`${redirectBase}/github/callback`
		}),
		api: {
			email: 'https://api.github.com/user/emails',
			user: 'https://api.github.com/user'
		},
		scopes: ['user:email'],
		userCodeVerifier: false
	},
	google: {
		name: 'Google',
		arctic: new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, `${redirectBase}/google/callback`),
		api: {
			user: 'https://www.googleapis.com/oauth2/v3/userinfo',
			email: 'https://www.googleapis.com/oauth2/v3/userinfo'
		},
		scopes: ['email','profile'],
		userCodeVerifier: true
	}
}
