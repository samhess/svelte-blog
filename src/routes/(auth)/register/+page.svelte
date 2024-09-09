<script>
	import AuthForm from '$lib/components/forms/auth.svelte'

	export let data
	const {form} = data
</script>

<article class="prose mx-auto mt-32 max-w-sm">
	<h1>Register</h1>
	<AuthForm data={form} />
</article>
