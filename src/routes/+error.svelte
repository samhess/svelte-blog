<script>
	import {page} from '$app/state'
</script>

<article class="prose dark:prose-invert mt-32">
	<h1>{page.status}: {page.error?.message}</h1>
</article>
