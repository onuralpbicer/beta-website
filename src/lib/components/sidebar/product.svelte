<script lang="ts">

    import type {ISidebarProduct} from "$lib/sanity.model";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
    import {page} from "$app/state";

    let {product, locale, depth}: {
        product: ISidebarProduct,
        locale: string,
        depth: number,
    } = $props();

    const href = $derived(() => `/${locale}/${product.slug}`)

    const isSelected = $derived(() => page.url.pathname.endsWith(href()))
</script>


<a style="padding-left: calc(calc(1rem * {depth}) + 4px);" class="sidebar-base {isSelected() ? 'sidebar-selected' : ''}" href={href()}>
    <ChevronRightIcon/>
    <span class="grow text-ellipsis overflow-hidden">{product.title}</span>
</a>
