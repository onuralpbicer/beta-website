<script lang="ts">
    import type {WhyUs} from "$lib/sanity.model";
    import * as icons from '@lucide/svelte/icons'

    const test = 'chevron-down'

    let {whyUs}: { whyUs: WhyUs } = $props();

    const Icon = $derived((icons as any)[(whyUs.iconName ?? '').split('-').map((part) => part.slice(0, 1).toUpperCase() + part.slice(1)).join('')])
</script>

<div class="flex flex-col justify-between items-center basis-1/4 gap-2 md:gap-4">
    <div class="bg-primary p-4 rounded-4xl">
        <Icon/>
    </div>
    <span class="text-center">
    {whyUs.title}
    </span>
</div>
