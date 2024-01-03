<script>
	import { SvelteUIProvider, TypographyProvider } from '@svelteuidev/core';
	import { AppShell, Navbar, Header, Stack, Divider } from '@svelteuidev/core';
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver={'dark'}>
	<TypographyProvider>
		<AppShell>
			<Navbar width={{ base: 200 }} slot="navbar">
				<h3>Navigation</h3>
				<Divider />
				<Stack>
					<a href="/">Upload</a>
					<a href="/list">View Uploaded Files</a>
				</Stack>
			</Navbar>
			<Header height="fill" slot="header">
				<h1>Uploadstr Web-ui</h1>
			</Header>
			<div style:padding-top="0.75em">
				<slot />
			</div>
		</AppShell>
	</TypographyProvider>
</SvelteUIProvider>
