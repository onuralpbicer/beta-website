<script lang="ts">

    import type {ISidebarProductSubCategory} from "$lib/sanity.model";
    import Product from "$lib/components/sidebar/product.svelte";
    import FolderIcon from "@lucide/svelte/icons/folder";
    import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
    import {page} from '$app/state'

    let {subcategory, locale, depth}: {
        subcategory: ISidebarProductSubCategory,
        locale: string,
        depth: number
    } = $props();

    const href = $derived(() => `/${locale}/${subcategory.slug}`)

    const isSelected = $derived(() => page.url.pathname.endsWith(href()))
</script>

<a style="padding-left: calc(calc(1rem * {depth}) + 4px)" class="sidebar-base {isSelected() ? 'sidebar-selected' : ''}" href={href()}>
    <FolderIcon class="stroke-accent-foreground fill-accent-foreground" />
    <span class="grow text-ellipsis overflow-hidden">{subcategory.title} ({subcategory.products?.length})</span>

    <ChevronUpIcon/>
</a>
<div>
    {#each subcategory.products as product}
        <Product product={product} locale={locale} depth={depth + 1}/>
    {/each}
</div>
