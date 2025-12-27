<script lang="ts">
    import type {PageProps} from './$types';
    import HomePage from '$lib/pages/home-page.svelte'
    import RichTextPage from '$lib/pages/rich-text-page.svelte'

    let {data, params}: PageProps = $props();
</script>

{#if data.entry}
    {#if data.entry._type === 'homePage'}
        <HomePage home={data.entry} locale={params.locale}/>
    {:else if (data.entry._type === 'richTextPage') }
        <RichTextPage richText={data.entry}/>
    {:else}
        {data.entry._type}
    {/if}
{/if}
