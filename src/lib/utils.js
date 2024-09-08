export function truncate(text='', limit = 40) {
	return text.length > limit ? `${text.slice(0, limit)}...` : text
}

/**
 * @param {*} date 
 * @returns 
 */
export function date(date) {
	return new Date(date).toLocaleDateString('en', {
		dateStyle: 'medium',
	})
}
