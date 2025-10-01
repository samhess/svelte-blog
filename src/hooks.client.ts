import type {HandleClientError} from '@sveltejs/kit'

export const handleError: HandleClientError = ({error, event, message, status}) => {
  console.error(`${status}: ${message}`)
}
