import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { PrismaClient } from "@prisma/client"
import { dev } from '$app/environment'
import { TimeSpan } from "oslo"

const client = new PrismaClient()
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(1, "d"),
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// we don't need to expose the hashed password!
			email: attributes.email
		}
	}
})
