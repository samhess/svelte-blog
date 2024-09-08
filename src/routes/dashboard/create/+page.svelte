<script>
	import Form from '$lib/components/forms/post.svelte'

	export let data
	const {form} = data
</script>

<div class="container mt-32">
	<h1 class="capitalize">Create post</h1>
	<Form data={form} />
</div>
