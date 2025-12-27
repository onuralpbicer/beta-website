<script lang="ts">
    import type {LayoutProps} from './$types';
    import Header from '$lib/header.svelte'
    import {page} from '$app/state'

    let {data, children, params}: LayoutProps = $props();

    const canonicalLang = $derived(() => data.alternateTranslations.find((l) => l.code === params.locale)!)
    const mainLang = $derived(() => data.alternateTranslations.find((l) => l.code === 'tr')!)

</script>

<Header headerInfo={data.header} locale={params.locale} translations={data.alternateTranslations}/>
<main>{@render children()}</main>
<footer>footer</footer>
<svelte:head>
    {#if data.entry}
        <link rel="canonical" href={`${page.url.origin}/${canonicalLang().code}/${canonicalLang().href}`}/>

        {#each data.alternateTranslations as translation}
            <link rel="alternate" hreflang={translation.hreflang}
                  href={`${page.url.origin}/${translation.code}/${translation.href}`}/>
        {/each}
        <link rel="alternate" hreflang="x-default" href={`${page.url.origin}/${mainLang().code}/${mainLang().href}`}/>

        <meta name="description" content={data.entry.metaDescription}/>
        <title>Beta Mühendislik - {data.entry.title}</title>
    {/if}
</svelte:head>