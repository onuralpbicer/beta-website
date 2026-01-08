<script lang="ts">

    import type {ISidebarProductCategory} from "$lib/sanity.model";
    import Product from "$lib/components/sidebar/product.svelte";
    import ProductSubCategory from "$lib/components/sidebar/product-subcategory.svelte";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    let {category, locale}: {
        category: ISidebarProductCategory,
        locale: string
    } = $props();
</script>


<div class="sidebar-container">
    <a class="sidebar-base sidebar-category" href='/{locale}/{category.slug}'>
        <span class="grow">{category.title}
        </span>

        <ChevronRightIcon/>
    </a>

    <div class="pl-2 xl:pl-4 bg-primary text-primary-foreground">
        {#each category.products as productOrCategory}
            {#if productOrCategory._type === 'productSubcategoriesPage'}
                <ProductSubCategory subcategory={productOrCategory} locale={locale}/>
            {:else if productOrCategory._type === 'productPage'}
                <Product product={productOrCategory} locale={locale}/>
            {:else}
                <!--  SHOULD NEVER COME HERE  -->
            {/if}
        {/each}
    </div>
</div>
