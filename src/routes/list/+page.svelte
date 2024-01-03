<script>
	import { Button, Card, Divider, Group, Image, Text, Title } from '@svelteuidev/core';
	import { deleteFile, getFiles } from '../../server';

	async function get() {
		let res = await getFiles();
		let text = await res.text();
		try {
			urls = JSON.parse(text);
			error = null;
			msg = null;
		} catch (e) {
			urls = null;
			error = text;
			msg = null;
		}
	}

	async function del(fileUrl) {
		let res = await deleteFile(fileUrl);
		let text = await res.text();
		try {
			urls = null;
			error = null;
			msg = text;
		} catch (e) {
			urls = null;
			error = null;
			msg = 'Oops... Something unexpected occurred.';
		}
	}

	function isImage(url) {
		let img_exts = ['png', 'jpeg', 'jpg', 'gif', 'webp', 'heif', 'heic', 'tiff', 'bmp'];
		let ext = url.split('.').pop();
		return ext != url && img_exts.includes(ext.toLowerCase());
	}

	function getFilename(url) {
		return url.split('/').pop();
	}

	let urls = null;
	let error = null;
	let msg = null;
</script>

<Button on:click={get}>Click here to get a list of files stored on the server.</Button>

{#if msg}
	<Title order={1} variant="gradient" gradient={{ from: 'blue', to: 'yellow', deg: 45 }}>
		Status
	</Title>
	<p>{msg}</p>
{/if}

{#if error}
	<Title order={1} variant="gradient" gradient={{ from: 'yellow', to: 'red', deg: 45 }}>
		ERROR
	</Title>
	<p>{error}</p>
{/if}

{#if urls}
	<Title order={1} variant="gradient" gradient={{ from: 'blue', to: 'red', deg: 45 }}>
		List of files on server
	</Title>
	{#each urls as url}
		<Card>
			{#if isImage(url)}
				<Card.Section padding="lg">
					<Image src={url} height={160} fit="contain" />
				</Card.Section>
			{/if}
			<Text>Filename: {getFilename(url)}</Text>
			<Group>
				<Text>URL:</Text>
				<Text variant="link" root="a" href={url}>
					{url}
				</Text>
			</Group>
			<Divider />
			<Button color="red" radius="xl" size="xs" compact uppercase on:click={() => del(url)}>
				Delete
			</Button>
		</Card>
	{/each}
{/if}
