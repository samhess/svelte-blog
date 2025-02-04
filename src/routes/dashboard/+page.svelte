<script>
	import {enhance} from '$app/forms'
	import {date, truncate} from '$lib/utils'

	let {data} = $props()
</script>

<article class="prose dark:prose-invert">
	<h1>Dashboard</h1>

	<table class="table table-auto">
		<thead>
			<tr>
				<th>Title</th>
				<th>Created</th>
				<th>Published</th>
				<th>Actions</th>
			</tr>
		</thead>

		<tbody>
			{#each data.posts as post, i}
				<tr>
					<td>
						<a class="capitalize" href="/dashboard/edit/{post.slug}">
							{truncate(post.title)}
						</a>
					</td>
					<td>{date(post.createdAt)}</td>
					<td>{post.published ? 'Yes' : 'No'}</td>
					<td>
						<form
							method="POST"
							action="?/delete&slug={post.slug}"
							use:enhance
						>
							<button class="btn variant-soft-error" type="submit">
								Delete
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	
	<div class="mt-8">
		<a class="font-medium capitalize underline-offset-4" href="/dashboard/create">
			+ Create a new post
		</a>
	</div>

</article>
