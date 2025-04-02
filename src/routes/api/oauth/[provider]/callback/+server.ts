import { redirect, error } from '@sveltejs/kit'
import { oauth } from '$lib/server/arctic.js'
import { generateSessionToken, createSession } from '$lib/server/session.js'
import db from '$lib/server/database.js'

type Address = {
	[index:string]: any
}

async function getAccessToken(providerKey='github', code:string, codeVerifier:string) {
	const provider = oauth[providerKey]
	if (provider.useCodeVerifier) {
		const tokens = await provider.arctic.validateAuthorizationCode(code, codeVerifier)
		return tokens.accessToken()
	} else if (code) {
		const tokens = await provider.arctic.validateAuthorizationCode(code)
		return tokens.accessToken()
	}
}

async function getEmail(provider='github', accessToken='') {
	const response = await fetch(oauth[provider].api.email, {headers:{Authorization: `Bearer ${accessToken}`}})
	if (response.ok) {
		if (provider==='github') {
			const addresses = await response.json() as Address[]
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

export async function GET({cookies,params,url}) {
	const {provider} = params
	const storedState = cookies.get(`${provider}State`)
	const state = url.searchParams.get('state')
	if (state === storedState) {
		const code = url.searchParams.get('code') as string
		const codeVerifier = cookies.get(`${provider}CodeVerifier`) as string
		const accessToken = await getAccessToken(provider, code, codeVerifier)
		if (accessToken) {
			const email = await getEmail(provider, accessToken)
			if (email) {
				const user = await db.user.findUnique({where:{email}})
				if (!user) {
					await db.user.create({data:{email}})
					console.info(`Added local user ${email}. Please complete details`)	
				}
				console.info(`OAuth login via ${provider} with ${email}`)
				const token = generateSessionToken()
				const session = await createSession(token, email)
				cookies.set('svelteBlog', token, {httpOnly:true, sameSite:'lax', expires:session.expiresAt, path:'/'})
				redirect(303, '/')
			} else {
				error(400, 'could not get email of OAuth user')
			}
		} else {
			error(400, `could not get access token for user/email api ${oauth[provider].api.email}`)
		}
	} else {
		error(400, 'invalid request')
	}
}