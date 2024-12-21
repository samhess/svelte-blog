<script>
	import Form from '$lib/components/forms/post.svelte'

	let {data} = $props()
</script>

<article class="prose mt-32">
	<h1 class="capitalize">Edit post</h1>
	<Form data={data.form} />
</article>
