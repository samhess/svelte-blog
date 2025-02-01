<script>
	import AuthForm from '$lib/components/forms/auth.svelte'

	let {data} = $props()
</script>

<article class="prose dark:prose-invert  mx-auto mt-32 max-w-sm">
	<h1>Log in</h1>
	<div class="card mt-8 p-1">
		<ul>
			<li>
				<a href="/api/oauth/github">Sign in with GitHub</a>
			</li>
			<li>
				<a href="/api/oauth/google">Sign in with Google</a>
			</li>
		</ul>
	</div>
	<AuthForm data={data.form} />
	<p class="mt-4">
		Don't have an account? <a href="/register">Register</a>
	</p>
</article>
