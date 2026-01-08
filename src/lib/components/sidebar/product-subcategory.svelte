<script lang="ts">

    import type {ISidebarProductSubCategory} from "$lib/sanity.model";
    import Product from "$lib/components/sidebar/product.svelte";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    let {subcategory, locale}: {
        subcategory: ISidebarProductSubCategory,
        locale: string
    } = $props();
</script>

<div class="sidebar-container">
    <a class="sidebar-base sidebar-category" href='/{locale}/{subcategory.slug}'>
        <span class="grow">{subcategory.title}</span>
        <ChevronRightIcon/>
    </a>

    <div class="pl-2 xl:pl-4 bg-sidebar-accent text-sidebar-accent-foreground">
        {#each subcategory.products as product}
            <Product product={product} locale={locale}/>
        {/each}
    </div>
</div>