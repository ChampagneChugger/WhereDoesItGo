<script lang="ts">
	import { enhance } from "$app/forms"
	import { tick } from "svelte"
	import type { ActionData } from "./$types"

	let url: string
	let loading: boolean = false
	let preview: boolean = false

	export let form: ActionData

	$: if (form) {
		loading = false
	}

	// https://lmg.gg/partners
</script>

<div class="content">
	<h1>Where does it go?</h1>

	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false })
			}
		}}
		method="POST"
	>
		<input class="inputfield" name="url" type="text" bind:value={url} />
		<button
			type="submit"
			on:click={async () => {
				loading = true
				await tick()
				let result = document.querySelector(".result")
				result?.scrollIntoView()
			}}>Reveal</button
		>
		<div class="options">
			<p>Options:</p>
			<label for="preview">
				<input id="preview" type="checkbox" bind:checked={preview} /> Preview website
			</label>
		</div>
	</form>
</div>
{#if loading == true}
	<div class="result"><h2>Loading...</h2></div>
{:else if form?.newUrl}
	<div class="result">
		<h2>It redirects to <a target="_blank" href={form.newUrl}>{form.newUrl}</a></h2>
		{#if preview}
			<h3>Preview</h3>
			<iframe srcdoc={form.web_code} title="Website" />
		{/if}
	</div>
{:else if form?.url}
	<div class="result">
		<h2>This URL does not redirect: <a target="_blank" href={form.url}>{form.url}</a></h2>
		{#if preview}
			<h3>Preview</h3>
			<iframe srcdoc={form.web_code} title="Website" />
		{/if}
	</div>
{:else if form?.error}
	<div class="result">
		<h2>{form.error}</h2>
	</div>
{/if}
