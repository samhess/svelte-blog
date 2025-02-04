<script>
	import {superForm} from 'sveltekit-superforms/client'

	/**
	 * @typedef {Object} Props
	 * @property {any} data - page data
	 */

	/** @type {Props} */
	let {data} = $props()

	let {form, enhance, message, constraints, errors} = $derived(superForm(data)) 
	let isDraft = $state($form.published)
</script>

{#if $message}<h3>{$message}</h3>{/if}

<div class="card mt-8">
	<form method="POST" class="space-y-6" use:enhance>
		<input type="number" name="id" bind:value={$form.id} hidden/>
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

		<label class="inline-flex items-center cursor-pointer">
			<span class=" me-2">Published</span>
			<input type="checkbox" name="published" bind:checked={isDraft} class="sr-only peer">
			<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
		</label>

		<label class="label" for="markdown">
			<span>Markdown</span>
			<textarea 
				class="form-textarea mt-2 rounded-none"
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

		<button class="btn preset-filled-primary-500" type="submit">Submit</button>
	</form>
</div>
