<script>
	import FileDrop from 'filedrop-svelte';
	import { uploadFile } from '$lib/requests';
	import { Card, Paper, Text } from '@svelteuidev/core';
	let results = [];
</script>

<FileDrop
	on:filedrop={async (e) => {
		results = await Promise.all(e.detail.files.accepted.map(uploadFile));
	}}
>
	<Paper shadow="lg" radius="lg" withBorder>Click this box to upload files</Paper>
</FileDrop>

{#if results.length > 0}
	<h1>Results</h1>
	{#each results as result}
		<Card>
			<Text>Filename: {result.filename}</Text>
			<Text>Status: {result.status}</Text>
			<Text>Server: {result.response}</Text>
		</Card>
	{/each}
{/if}
