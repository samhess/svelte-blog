<script>
	export let data
	const {post} = data
</script>

<article class="prose mt-32">
	<h1>{post.title}</h1>
	<div class="mt-8 max-w-[80ch] space-y-8">
		{@html post.html}
	</div>
</article>
