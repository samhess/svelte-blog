import { GitHub, Google } from 'arctic'
import { 
	GITHUB_CLIENT_ID, 
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID, 
	GOOGLE_CLIENT_SECRET
} from '$env/static/private'

type Oauth = {
	[index:string]: any
}

const redirectURL = 'http://localhost:5173/api/oauth'

export const oauth:Oauth = {
	github: {
		arctic: new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, `${redirectURL}/github/callback`),
		api: {
			email: 'https://api.github.com/user/emails',
			user: 'https://api.github.com/user'
		},
		scopes: ['user:email'],
		useCodeVerifier: false
	},
	google: {
		arctic: new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, `${redirectURL}/google/callback`),
		api: {
			user: 'https://www.googleapis.com/oauth2/v3/userinfo',
			email: 'https://www.googleapis.com/oauth2/v3/userinfo'
		},
		scopes: ['email','profile'],
		useCodeVerifier: true
	}
}
