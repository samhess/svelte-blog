import { generateState, generateCodeVerifier} from 'arctic'
import { redirect } from '@sveltejs/kit'
import { providers } from '$lib/server/arctic.js'
import { dev } from '$app/environment'

/**
 * @param {string} providerKey 
 * @param {string} state 
 * @param {string} codeVerifier 
 */
async function createAuthorizationURL(providerKey, state, codeVerifier) {
	const provider = providers[providerKey]
	if (provider.useCodeVerifier) {
		return await provider.arctic.createAuthorizationURL(state, codeVerifier, provider.scopes)
	} else {
		return await provider.arctic.createAuthorizationURL(state, provider.scopes)
	}
} 

/** @type {import('./$types').RequestHandler} */
export async function GET({cookies,params}) {
	const {provider} = params
  const state = generateState()
	const codeVerifier = generateCodeVerifier()
	const authUrl = await createAuthorizationURL(provider, state, codeVerifier)
	const cookieOptions = {httpOnly:false, secure:!dev, maxAge:10*60, path:"/"}
	cookies.set(`${provider}State`, state, cookieOptions)
	cookies.set(`${provider}CodeVerifier`, codeVerifier, cookieOptions)
	redirect(302, authUrl.href)
}