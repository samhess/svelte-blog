<script>
	import { page } from '$app/stores'
</script>

<article class="prose mt-32">
	<h1>{$page.status}: {$page.error?.message}</h1>
</article>
