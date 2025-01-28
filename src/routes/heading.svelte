<script>
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
</script>

<nav class="mt-8 flex justify-between">
	<a class="unstyled text-xl" href="/">Svelte Blog</a>

	<div class="flex items-center gap-4">
		<ol class="flex space-x-4">
			<li>
				<a class="unstyled muted" href="/blog">Blog</a>
			</li>
			<li>
				<a class="unstyled muted" href="/dashboard">Dashboard</a>
			</li>
			<li>
				<a class="unstyled muted" href="/about">About</a>
			</li>
			{#if $page.data.user}
				<li>
					<form method="POST" action="/logout" use:enhance>
						<button class="muted" type="submit">Log out</button>
					</form>
				</li>
			{/if}
		</ol>
	</div>
</nav>
