import { redirect, error } from '@sveltejs/kit'
import { lucia, providers } from '$lib/server/auth.js'
import db from '$lib/server/database.js'

/**
 * @param {string} provider 
 * @param {string|null|undefined} code 
 * @param {string|null|undefined} codeVerifier 
 */
async function getAccessToken(provider='github', code, codeVerifier) {
	if (['google'].includes(provider) && code && codeVerifier) {
		const {accessToken} = await providers[provider].arctic.validateAuthorizationCode(code, codeVerifier)
		return accessToken
	} else if (code) {
		const {accessToken} = await providers[provider].arctic.validateAuthorizationCode(code)
		return accessToken
	}
}

async function getEmail(provider='github', accessToken='') {
	const response = await fetch(providers[provider].api.email, {headers:{Authorization: `Bearer ${accessToken}`}})
	if (response.ok) {
		if (provider==='github') {
			/** @type {Object<string,any>[]} */
			const addresses = await response.json()
			const address = addresses.find(({primary})=>primary)
			if (address) {
				return address.email
			}
		}
		if (provider==='google') {
			const user = await response.json()
			return user.email
		}
	} else {
		console.error(response.statusText)
	}
}

/** @type {import('./$types').RequestHandler} */
export async function GET({cookies,params,url}) {
	const {provider} = params
	const storedState = cookies.get(`${provider}State`)
	const state = url.searchParams.get('state')
	if (state === storedState) {
		const code = url.searchParams.get('code')
		const codeVerifier = cookies.get(`${provider}CodeVerifier`)
		const accessToken = await getAccessToken(provider, code, codeVerifier)
		if (accessToken) {
			const email = await getEmail(provider, accessToken)
			if (email) {
				const user = await db.user.findUnique({where:{username:email}})
				if (!user) {
					await db.user.create({data:{username:email}})
					console.info(`Added local user ${email}. Please complete details`)	
				}
				console.info(`OAuth login via ${provider} with ${email}`)	
				const session = await lucia.createSession(email, {})
				const {name, value, ...attributes} = lucia.createSessionCookie(session.id)
				cookies.set(name, value, {...attributes,path:'/'})
				redirect(302, '/')
			} else {
				error(400, 'could not get email of OAuth user')
			}
		} else {
			error(400, `could not get access token for user/email api ${providers[provider].api.email}`)
		}
	} else {
		error(400, 'invalid request')
	}
}