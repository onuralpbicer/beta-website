<script lang="ts">

    import type {ISidebarProductCategory} from "$lib/sanity.model";
    import Product from "$lib/components/sidebar/product.svelte";
    import ProductSubCategory from "$lib/components/sidebar/product-subcategory.svelte";
    import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
    import FolderIcon from "@lucide/svelte/icons/folder";
    import {page} from "$app/state";

    let {category, locale}: {
        category: ISidebarProductCategory,
        locale: string
    } = $props();


    const href = $derived(() => `/${locale}/${category.slug}`)

    const isSelected = $derived(() => page.url.pathname.endsWith(href()))
</script>


<a class="sidebar-base {isSelected() ? 'sidebar-selected' : ''}" href='/{locale}/{category.slug}'>
    <FolderIcon class="stroke-accent-foreground fill-accent-foreground" />
    <span class="grow text-ellipsis overflow-hidden">
        {category.title}
    </span>

    <ChevronUpIcon/>
</a>
<div>
    {#each category.products as productOrCategory}
        {#if productOrCategory._type === 'productSubcategoriesPage'}
            <ProductSubCategory subcategory={productOrCategory} locale={locale} depth={1}/>
        {:else if productOrCategory._type === 'productPage'}
            <Product product={productOrCategory} locale={locale} depth={1}/>
        {:else}
            <!--  SHOULD NEVER COME HERE  -->
        {/if}
    {/each}
</div>
