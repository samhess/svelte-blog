<script>
	import { superForm } from 'sveltekit-superforms/client'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	//import Editor from '$lib/components/editor.svelte'
	

	/**
	 * @typedef {Object} Props
	 * @property {any} data - page data
	 */

	/** @type {Props} */
	let {data} = $props()

	const { form, enhance, message, constraints, errors } = superForm(data)
	let isDraft = $state($form.published)
</script>

{#if $message}<h3>{$message}</h3>{/if}

<div class="card mt-8 p-8">
	<form method="POST" class="space-y-6" use:enhance>
		<label class="label" for="title">
			<span class="block">Title</span>
			<input
				class="input"
				type="text"
				name="title"
				id="title"
				class:input-error={$errors.title}
				aria-invalid={$errors.title ? 'true' : undefined}
				bind:value={$form.title}
				{...$constraints.title}
			/>
		</label>
		{#if $errors.title}
			<span class="invalid">{$errors.title}</span>
		{/if}

		<label class="label" for="slug">
			<span>Slug</span>
			<input
				class="input"
				type="text"
				name="slug"
				id="slug"
				class:input-error={$errors.slug}
				aria-invalid={$errors.slug ? 'true' : undefined}
				bind:value={$form.slug}
				{...$constraints.slug}
			/>
		</label>
		{#if $errors.slug}
			<span class="invalid">{$errors.slug}</span>
		{/if}

		<label class="label" for="description">
			<span>Description</span>
			<input
				class="input mt-2"
				type="text"
				name="description"
				id="description"
				class:input-error={$errors.description}
				aria-invalid={$errors.description ? 'true' : undefined}
				bind:value={$form.description}
				{...$constraints.description}
			/>
		</label>
		{#if $errors.description}
			<span class="invalid">{$errors.description}</span>
		{/if}

		<label class="label" for="description">
			<span>Markdown</span>
			<textarea 
				class="input mt-2 rounded-none"
				name="markdown"
				aria-invalid={$errors.markdown ? 'true' : undefined}
				bind:value={$form.markdown} 
				placeholder="Enter markdown here"
				{...$constraints.markdown}
				rows="10"
			></textarea>
		</label>
		{#if $errors.markdown}
			<span class="invalid">{$errors.markdown}</span>
		{/if}

		<div>
			<SlideToggle name="published" bind:checked={isDraft}>
				Published
			</SlideToggle>
		</div>

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>
