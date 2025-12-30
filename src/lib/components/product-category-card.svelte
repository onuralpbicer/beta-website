<script lang="ts">

    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    let {href, title, subtitle, image, tags}: {
        image: string | null,
        title: string | null,
        subtitle?: string | null,
        href: string | null,
        tags?: string[] | null
    } = $props();

</script>


<a href={href}>
    <div class="mt-2 rounded-lg p-2 shadow-md border border-gray-200">
        <div class="grid grid-cols-[2fr_4fr_auto] grid-rows-2 gap-2">
            <img alt="{title} thumbnail" class="rounded-md row-span-full h-full object-cover" src={image}/>
            <h2 class="font-bold grow text-ellipsis whitespace-nowrap overflow-hidden">{title}</h2>
            <span class="row-span-full -col-start-1 place-self-center">
                <ChevronRightIcon/>
            </span>

            <p class="row-2 text-gray-500 mb-2">{subtitle}</p>
        </div>

        {#if tags?.length}
            <div class="grid grid-cols-2 border-t pt-2 mt-2">
                <div class="flex flex-wrap gap-2">
                    {#each tags as tag}
                        <span class="bg-secondary text-secondary-foreground px-2 rounded-4xl">{tag}</span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</a>