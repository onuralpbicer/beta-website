<script lang="ts">

    import type {ISidebarProduct} from "$lib/sanity.model";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    let {product, locale, depth}: {
        product: ISidebarProduct,
        locale: string,
        depth: number,
    } = $props();
</script>


<a style="padding-left: calc(calc(1rem * {depth}) + 4px);" class="sidebar-base" href='/{locale}/{product.slug}'>
    <ChevronRightIcon/>
    <span class="grow text-ellipsis overflow-hidden">{product.title}</span>
</a>
