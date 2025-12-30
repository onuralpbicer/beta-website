<script lang="ts">

    import type {IProductListPage} from "$lib/sanity.model";
    import ProductCategoryCard from '$lib/components/product-category-card.svelte'

    let {services, locale}: { services: IProductListPage, locale: string } = $props();

    const tags = $derived(() => Array.from(new Set(services.page.products?.flatMap((product) =>
            product.tags?.map((tag) => tag.trim()).filter(Boolean) ?? []
        )
    )))

    let selectedTags = $state<Array<string>>(tags());

    const allSelected = $derived(selectedTags.length === tags().length)

    function selectAll() {
        selectedTags = tags()
    }

    function select(tag: string) {
        if (allSelected) {
            selectedTags = [tag]
            return;
        }

        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter((t) => t !== tag)
            if (selectedTags.length === 0) {
                selectAll()
            }
        } else {
            selectedTags = [...selectedTags, tag]
        }
    }

    const filtered = $derived(services.page.products?.filter((productOrCategory) => {
        if (allSelected) return true

        return productOrCategory.tags?.some((tag) => selectedTags.includes(tag.trim()))
    }) ?? [])
</script>

<section class="mx-auto w-full md:max-w-[70vw] md:min-w-175 px-8 my-8 min-h-[60dvh]">
    <h1 class="heading-1 mb-2">{services.title}</h1>
    <p class="mb-2 text-gray-500">{services.page.description}</p>

    <button class="{allSelected ? 'bg-primary text-primary-foreground' : ''} px-4 py-1 rounded-4xl border-gray-200 border"
            onclick={selectAll}>All
    </button>
    {#each tags() as tag}
        <button class="{selectedTags.includes(tag) ? 'bg-secondary text-secondary-foreground' : ''} ml-2 px-4 py-1 rounded-4xl border-gray-200 border"
                onclick={() => select(tag)}>{tag}</button>
    {/each}

    <div class="mt-4">
        {#each filtered as productOrCategory}
            {@const itemsCount = productOrCategory.products?.length ?? 0}
            {#if productOrCategory._type === 'productCategoriesPage' }
                {@const
                    subCategoriesCount = productOrCategory.products?.filter((product) => product._type === 'productSubcategoriesPage').length ?? 0}
                <ProductCategoryCard href="/{locale}/{productOrCategory.slug}"
                                     image={productOrCategory.image} title={productOrCategory.title}
                                     subtitle="{itemsCount} items &middot; {subCategoriesCount} subcategories"
                                     tags={productOrCategory.tags}
                />
            {:else if productOrCategory._type === 'productSubcategoriesPage'}
                <ProductCategoryCard href="/{locale}/{productOrCategory.slug}"
                                     image={productOrCategory.image} title={productOrCategory.title}
                                     subtitle="{itemsCount} items"
                                     tags={productOrCategory.tags}
                />
            {:else if productOrCategory._type === 'productPage'}
                <ProductCategoryCard href="/{locale}/{productOrCategory.slug}"
                                     image={productOrCategory.image} title={productOrCategory.title}
                                     tags={productOrCategory.tags}
                />
            {:else}
                <!--  SHOULD NEVER COME HERE  -->
            {/if}
        {/each}
    </div>
</section>
