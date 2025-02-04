<script>
	let {data} = $props()
	let {post} = $derived(data) 
</script>

<article class="prose dark:prose-invert">
	<h1>{post.title}</h1>
	{@html post.html}
</article>
