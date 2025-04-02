export function truncate(text:string, limit=40) {
	return text.length > limit ? `${text.slice(0, limit)}...` : text
}

export function date(date:number|string|Date) {
	return new Date(date).toLocaleDateString('default', {
		dateStyle: 'long',
	})
}
