<script>
	import {superForm} from 'sveltekit-superforms/client'

	let {data} = $props()
	let {form, constraints, enhance, errors} = $derived(superForm(data)) 
</script>

<div class="mt-8">
	<form method="POST" class="space-y-6" use:enhance>
		<label class="label" for="username">
			<span class="block">Username</span>
			<input
				class="input"
				type="text"
				name="username"
				id="username"
				class:input-error={$errors.username}
				data-invalid={$errors.username}
				bind:value={$form.username}
				{...$constraints.username}
			/>
		</label>
		{#if $errors.username}
			<span class="text-red-400">{$errors.username}</span>
		{/if}

		<label class="label" for="password">
			<span class="block">Password</span>
			<input
				class="input"
				type="password"
				name="password"
				id="password"
				class:input-error={$errors.password}
				data-invalid={$errors.password}
				bind:value={$form.password}
				{...$constraints.password}
			/>
		</label>
		{#if $errors.password}
			<span class="text-red-400">{$errors.password}</span>
		{/if}
		<button class="btn preset-filled-primary-500 mt-2" type="submit">Submit</button>
	</form>
</div>
