<script>
	import { date } from '$lib/utils'

	let {data} = $props()
	let {posts} = $derived(data)
</script>

<article class="prose dark:prose-invert">
	<h1 class="capitalize">Latest posts</h1>

	<div class="mt-8 space-y-6">
		{#each posts as post, i}
			<ol class="list-none pl-0">
				<li>
					<h3>
						<a
							class="font-semibold capitalize text-primary-500"
							href="/blog/{post.slug}"
						>
							{post.title}
						</a>
					</h3>
					<p>{post.description}</p>
					<p class="text-gray-600 dark:text-gray-400">
						{date(post.createdAt)}
					</p>
				</li>
			</ol>

			{#if posts.length > 1 && posts.length !== i + 1}
				<hr />
			{/if}
		{/each}
	</div>
</article>
