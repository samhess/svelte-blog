<script>
	import {slide} from 'svelte/transition'
	import {date} from '$lib/utils'

	let {data} = $props()
	let {posts} = $derived(data)

	let search = $state('')

	let filteredPosts = $derived(posts.filter(({title}) =>
		title.toLowerCase().includes(search.trim())
	))
</script>

<article class="prose dark:prose-invert">
	<h1 class="capitalize">Blog</h1>

	<form class="mt-8">
		<label>
			<input type="search" autocomplete="off" name="search" placeholder="search posts" bind:value={search}/>
		</label>
	</form>

	<div class="mt-8">
		<ol class="list-none pl-0">
			{#each filteredPosts as post, i}
				<li transition:slide|local>
					<h3>
						<a
							class="font-semibold capitalize text-primary-500"
							href="/blog/{post.slug}"
						>
							{post.title}
						</a>
					</h3>
					<p>{post.description}
						<span class="text-gray-600 dark:text-gray-400">
							({date(post.createdAt)})
						</span>
					</p>
				</li>

				{#if data.posts.length > 1 && data.posts.length !== i + 1}
					<hr />
				{/if}
			{/each}
		</ol>
	</div>
</article>
