<script>
	import { SvelteUIProvider, TypographyProvider } from '@svelteuidev/core';
    import { Link } from 'svelte-routing';
	import { AppShell, Navbar, Header, Anchor, Stack, Button, Divider } from '@svelteuidev/core';

	let isDark = false;
	function toggleTheme() {
		isDark = !isDark;
	}

</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver={'dark'}>
    <TypographyProvider>
        <AppShell>
            <Navbar width={{base: 200}} slot="navbar">
                <h3>Navigation</h3>
                <Divider />
                <Stack>
                    <a href="/">Upload</a>
                    <a href="/list">View Uploaded Files</a>
                </Stack>
            </Navbar>
            <Header slot="header">
                <h1>Uploadstr Web-ui</h1>
            </Header>
            <slot />
        </AppShell>
    </TypographyProvider>
</SvelteUIProvider>
