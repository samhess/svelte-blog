<script>
	import AuthForm from '$lib/components/forms/auth.svelte'

	export let data
</script>

<article class="prose mx-auto mt-32 max-w-sm">
	<h1>Log in</h1>
	<AuthForm data={data.form} />
	<p class="mt-4">
		Don't have an account? <a href="/register">Register</a>
	</p>
</article>
