<script lang="ts">
    import type {PageProps} from './$types';
    import HomePage from '$lib/pages/home-page.svelte'
    import type {IHomePageEntry} from "$lib/contentful";

    let {data, params}: PageProps = $props();

    const homePage = $derived(() => data.entry as IHomePageEntry)
</script>

{#if data.entry?.sys.contentType.sys.id === 'homePage'}
    <HomePage home={homePage()}/>
{/if}