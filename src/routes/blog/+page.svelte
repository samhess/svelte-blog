<script>
	import { createBubbler, preventDefault } from 'svelte/legacy';

	const bubble = createBubbler();
	import { slide } from 'svelte/transition'
	import { date } from '$lib/utils'

	let {data} = $props()
	let {posts} = $derived(data)

	let search = $state('')

	let filteredPosts = $derived(posts.filter(({title}) =>
		title.toLowerCase().includes(search.trim())
	))
</script>

<article class="prose mt-32">
	<h1 class="capitalize">Search posts</h1>

	<form oninput={preventDefault(bubble('input'))} class="mt-8">
		<label for="search">
			<input
				type="search"
				autocomplete="off"
				class="input"
				name="search"
				id="search"
				bind:value={search}
			/>
		</label>
	</form>

	<div class="mt-8">
		<ol class="list-none pl-0 space-y-6">
			{#each filteredPosts as post, i}
				<li transition:slide|local>
					<h3>
						<a
							class="unstyled font-semibold capitalize text-primary-500"
							href="/blog/{post.slug}"
						>
							{post.title}
						</a>
					</h3>
					<p>{post.description}</p>
					<p class="mt-4 text-gray-600 dark:text-gray-400">
						{date(post.createdAt)}
					</p>
				</li>

				{#if data.posts.length > 1 && data.posts.length !== i + 1}
					<hr />
				{/if}
			{/each}
		</ol>
	</div>
</article>
