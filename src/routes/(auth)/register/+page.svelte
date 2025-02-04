<script>
	import AuthForm from '$lib/components/forms/auth.svelte'

	let {data} = $props()
	let {form} = $derived(data)
</script>

<article class="prose dark:prose-invert mx-auto mt-32 max-w-sm">
	<h1>Register</h1>
	<AuthForm data={form} />
</article>
