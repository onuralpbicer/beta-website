<script lang="ts">
    import type {PageProps} from './$types';
    import HomePage from '$lib/pages/home-page.svelte'
    import RichTextPage from '$lib/pages/rich-text-page.svelte'
    import type {IHomePageEntry, IRichTextPageEntry} from "$lib/contentful";
    import {dateFieldAttrs} from "bits-ui/dist/bits/date-field/date-field.svelte";

    let {data, params}: PageProps = $props();


    if (data.entry && data.entry._type === 'homePage') {
        data.entry.
    }
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
