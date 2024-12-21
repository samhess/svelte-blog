<script>
	import Heading from './heading.svelte'
	import Footer from './footer.svelte'
	import '../app.css'
	
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {children} = $props()
</script>

<svelte:head>
	<title>Blog</title>
	<link rel="icon" href="https://fav.farm"/>
</svelte:head>

<div class="container">
	<Heading/>
	<main class="mt-32">
		{@render children?.()}
	</main>
	<Footer/>
</div>

