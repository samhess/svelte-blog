<script>
	import Heading from './heading.svelte'
	import Footer from './footer.svelte'
	import '../app.css'
</script>

<svelte:head>
	<title>Blog</title>
	<link rel="icon" href="https://fav.farm" />
</svelte:head>

<Heading />
<slot />
<Footer />
