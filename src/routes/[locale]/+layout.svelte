<script lang="ts">
    import type {LayoutProps} from './$types';
    import Header from '$lib/components/header.svelte'
    import {page} from '$app/state'
    import Footer from "$lib/components/footer.svelte";

    let {data, children, params}: LayoutProps = $props();

    const canonicalLang = $derived(() => data.alternateTranslations.find((l) => l.code === params.locale)!)
    const mainLang = $derived(() => data.alternateTranslations.find((l) => l.code === 'tr')!)

    const canonicalUrl = $derived(() => `${page.url.origin}/${canonicalLang().code}/${canonicalLang().href}`)
</script>

<Header headerInfo={data.header} locale={params.locale} translations={data.alternateTranslations}/>
<main class="grow">{@render children()}</main>
<Footer footer={data.footer} locale={params.locale}/>
<svelte:head>
    {#if data.entry}
        <link rel="canonical" href={canonicalUrl()}/>

        {#each data.alternateTranslations as translation}
            <link rel="alternate" hreflang={translation.hreflang}
                  href='{page.url.origin}/{translation.code}/{translation.href}'/>
        {/each}
        <link rel="alternate" hreflang="x-default" href='{page.url.origin}/{mainLang().code}/{mainLang().href}'/>

        <meta name="description" content={data.entry.metaDescription}/>
        <title>Beta Mühendislik - {data.entry.title}</title>

        <meta property="og:title" content={data.entry.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl()} />
<!--        todo, maybe implement on actual page level -->
<!--        <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" /> -->
        <meta property="og:description" content={data.entry.metaDescription} />
        <meta property="og:locale" content={params.locale} />

        {#each data.alternateTranslations as translation}
            <meta property="og:locale:alternate" content={translation.code} />
        {/each}

    {/if}
</svelte:head>