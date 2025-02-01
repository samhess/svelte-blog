<script>
	import { enhance } from '$app/forms'
</script>

<article class="prose dark:prose-invert  mt-32">
	<h1>Newsletter</h1>

	<div class="mt-8 max-w-md">
		<form method="POST" action="?/subscribe" use:enhance>
			<div class="flex gap-2">
				<input class="input" type="email" name="email" />
				<button class="btn preset-filled-primary-500" type="submit">
					Subscribe
				</button>
			</div>
		</form>
	</div>
</article>
