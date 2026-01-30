<script lang="ts">
    import type {IProductPage} from "$lib/sanity.model";

    let {product}: {
        product: NonNullable<IProductPage['page']['relatedProducts']>[0],
    } = $props();
</script>

<a
        href={product.slug ? `/urun/${product.slug}` : "#"}
        class="max-w-62.5 group block rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-[#36AAE7]/40"
>
    <!-- Image -->
    <div class="aspect-4/3 overflow-hidden rounded-t-xl bg-slate-100">
        {#if product.image}
            <img
                    src={product.image}
                    alt={product.title ?? "Product image"}
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
        {/if}
    </div>

    <!-- Content -->
    <div class="p-4 space-y-2">
        <h3 class="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
            {product.title ?? "Ürün"}
        </h3>

        {#if product.price != null}
            <p class="text-sm font-medium text-[#36AAE7]">
                {product.price} {product.currency}
            </p>
        {/if}

        <div class="pt-2 text-xs font-medium text-slate-500 transition group-hover:text-[#36AAE7]">
            Detayları Gör →
        </div>
    </div>
</a>
