<script lang="ts">
    import type {PageProps} from './$types';
    import HomePage from '$lib/pages/home-page.svelte'
    import RichTextPage from '$lib/pages/rich-text-page.svelte'
    import type {IHomePageEntry, IRichTextPageEntry} from "$lib/contentful";

    let {data, params}: PageProps = $props();

    const homePage = $derived(() => data.entry as IHomePageEntry)
    const richTextPage = $derived(() => data.entry as IRichTextPageEntry)
</script>

{#if data.entry?.sys.contentType.sys.id === 'homePage'}
    <HomePage home={homePage()}/>
{:else if (data.entry?.sys.contentType.sys.id === 'richTextPage') }
    <RichTextPage richText={richTextPage()}/>
{/if}
