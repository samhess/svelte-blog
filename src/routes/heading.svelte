<script>
	import {page} from '$app/state'
	import {enhance} from '$app/forms'
</script>

<nav class="mt-8 flex justify-between">
	<a class="text-2xl font-bold mt-2" href="/">Svelte Blog</a>

	<div class="flex items-center gap-4">
		<ol class="flex space-x-4">
			<li>
				<a class="" href="/blog">Blog</a>
			</li>
			<li>
				<a class="" href="/dashboard">Dashboard</a>
			</li>
			<li>
				<a class="" href="/about">About</a>
			</li>
			{#if page.data.user}
				<li>
					<form method="POST" action="/logout" use:enhance>
						<button class="" type="submit">Log out</button>
					</form>
				</li>
			{/if}
		</ol>
	</div>
</nav>
