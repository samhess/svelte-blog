import { generateState, generateCodeVerifier} from 'arctic'
import { redirect } from '@sveltejs/kit'
import { providers } from '$lib/server/auth.js'
import { dev } from '$app/environment'

/**
 * @param {string} providerKey 
 * @param {string} state 
 * @param {string} codeVerifier 
 */
async function createAuthorizationURL(providerKey, state, codeVerifier) {
	const provider = providers[providerKey]
	const {arctic, scopes, userCodeVerifier} = provider
	if (userCodeVerifier) {
		return await arctic.createAuthorizationURL(state, codeVerifier, {scopes})
	} else {
		return await arctic.createAuthorizationURL(state, {scopes})
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