<script lang="ts">
    import type {PageProps} from './$types';
    import HomePage from '$lib/pages/home-page.svelte'
    import RichTextPage from '$lib/pages/rich-text-page.svelte'
    import ProductListPage from '$lib/pages/product-list-page.svelte'
    import ProductPage from '$lib/pages/product-page.svelte'

    let {data, params}: PageProps = $props();
</script>

{#if data.entry}
    {#if data.entry._type === 'homePage'}
        <HomePage home={data.entry} locale={params.locale}/>
    {:else if (data.entry._type === 'richTextPage') }
        <RichTextPage richText={data.entry}/>
    {:else if ((data.entry._type === 'servicesPage' || data.entry._type === 'productCategoriesPage' || data.entry._type === 'productSubcategoriesPage') && data.services) }
        <ProductListPage entry={data.entry} services={data.services} locale={params.locale}/>
    {:else if (data.entry._type === 'productPage')}
        <ProductPage product={data.entry} locale={params.locale} services={data.services}/>
    {:else}
        {data.entry._type}
    {/if}
{/if}
