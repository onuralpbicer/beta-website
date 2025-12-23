<script lang="ts">
    import type {LayoutProps} from './$types';
    import Header from '$lib/header.svelte'

    let {data, children, params}: LayoutProps = $props();

    const canonicalLang = $derived(() => data.alternateTranslations.find((l) => l.code === params.locale)!)
    const mainLang = $derived(() => data.alternateTranslations.find((l) => l.code === 'tr')!)

</script>

<Header headerInfo={data.header} locale={params.locale} translations={data.alternateTranslations}/>
<main>{@render children()}</main>
<footer>footer</footer>
<svelte:head>
    {#if data.entry}
        <link rel="canonical" href={`/${canonicalLang().code}/${canonicalLang().href}`}/>

        {#each data.alternateTranslations as translation}
            <!-- todo might need to fix these hrefs -->
            <link rel="alternate" hreflang={translation.hreflang} href={`/${translation.code}/${translation.href}`}/>
        {/each}
        <link rel="alternate" hreflang="x-default" href={`/${mainLang().code}/${mainLang().href}`}/>
    {/if}
</svelte:head>