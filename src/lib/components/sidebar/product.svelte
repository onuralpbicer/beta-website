<script lang="ts">

    import type {ISidebarProduct} from "$lib/sanity.model";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    let {product, locale}: {
        product: ISidebarProduct,
        locale: string
    } = $props();
</script>


<a class="sidebar-base" href='/{locale}/{product.slug}'>
    <span class="grow">{product.title}</span>
    <ChevronRightIcon/>
</a>
