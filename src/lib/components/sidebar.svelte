<script lang="ts">

    import type {IProductListPage} from "$lib/sanity.model";
    import type {GetServicesQueryResult} from "$lib/sanity.types";
    import Product from "$lib/components/sidebar/product.svelte";
    import ProductSubCategory from "$lib/components/sidebar/product-subcategory.svelte";
    import ProductCategory from "$lib/components/sidebar/product-category.svelte";

    let {services, locale}: {
        services: GetServicesQueryResult,
        locale: string
    } = $props();

    console.log(services)
</script>

<aside class="not-lg:hidden w-[30vw] max-w-75 xl:max-w-100 bg-sidebar-accent text-sidebar-accent-foreground shadow-xl">
    {#if services}
        <nav class="py-2">
            <a class="text-black font-semibold mx-4" href='/{locale}/{services.slug}'>{services.description}</a>
            {#each services.products as productOrCategory}
                {#if productOrCategory._type === 'productCategoriesPage' }
                    <ProductCategory category={productOrCategory} locale={locale}/>
                {:else if productOrCategory._type === 'productSubcategoriesPage'}
                    <ProductSubCategory subcategory={productOrCategory} locale={locale}/>
                {:else if productOrCategory._type === 'productPage'}
                    <Product product={productOrCategory} locale={locale}/>
                {:else}
                    <!--  SHOULD NEVER COME HERE  -->
                {/if}
            {/each}
        </nav>
    {/if}
</aside>
