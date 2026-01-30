<script lang="ts">
    import type {IProductListPage, IProductPage} from "$lib/sanity.model";
    import {translate} from "$lib/i18n";
    import type {GetServicesQueryResult} from "$lib/sanity.types";
    import Sidebar from "$lib/components/sidebar.svelte";

    let {product, locale, services}: {
        product: IProductPage,
        locale: string ,
        services: GetServicesQueryResult,
    } = $props();
</script>


<div class="lg:flex h-full">
    <Sidebar locale={locale} services={services}/>
    <div>

<section class="mx-auto w-full md:max-w-[70vw] md:min-w-175 px-8 my-4">
    <h1 class="heading-1 mb-2">{product.title}</h1>

    <div class="product-details lg:grid gap-4">
        <p class="mb-2 text-gray-500" style="grid-area: desc">{product.page.description}</p>
        <img alt="{product.title} product photo" class="w-full rounded-md" src={product.page.image}
             style="grid-area: img"/>

        <div style="grid-area: details">
            <p class="mt-4 lg:mt-0">{translate(locale, 'brand')}: {product.page.brand}</p>
            <p class="mt-2 lg:mt-0">{translate(locale, 'productCode')}: {product.page.productCode}</p>
        </div>

        <p class="my-2 font-bold text-2xl"
           style="grid-area: cost">{product.page.price.price} {product.page.price.currency}
            ({translate(locale, 'tax')} {translate(locale, product.page.price.taxIncluded ? 'included' : 'excluded')}
            )</p>

        <div class="bg-gray-100 -mx-2 p-2 rounded-md shadow-md" style="grid-area: features">
            <h2 class="font-bold text-xl mb-2 " id="key-features-title">{translate(locale, 'keyFeatures')}</h2>
            <ul aria-labelledby="key-features-title" class="ml-4">
                {#each product.page.keyFeatures as feature}
                    <li class="pl-2">{feature}</li>
                {/each}
            </ul>
            <hr class="my-2"/>
            <div class="flex justify-between items-center">
                <button>todo view category</button>

                <a class="text-secondary-foreground" href="{product.page.document.url}?dl=">
                    {translate(locale, 'download')}
                </a>
            </div>
        </div>

        <button class="mt-4 w-full sticky bottom-2 bg-primary text-primary-foreground rounded-md px-4 py-2 self-end"
                style="grid-area: contact">{translate(locale, 'contact')}</button>
    </div>
</section>
<section class="mx-auto w-full md:max-w-[70vw] md:min-w-175 px-8 my-4">
    <h2 class="font-bold text-xl mb-2" id="key-features-title">{translate(locale, 'related')}</h2>

    <div class="flex justify-around items-center flex-wrap gap-4">
        {#each product.page.relatedProducts as related}
            <a class="basis-[calc(50%-20px)]" href="/{locale}/{related.slug}">
                <img class="w-full rounded-md" src={related.image} alt="{related.title} product photo"/>
                <hr class="my-2"/>
                <h3 class="text-center">
                    {related.title}
                </h3>
                <p class="text-center">{related.price} {related.currency}</p>
            </a>
        {/each}
    </div>

</section>
</div>
</div>

<style>
    ul {
        list-style-type: '\2713';
    }
</style>
