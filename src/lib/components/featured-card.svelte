<script lang="ts">
    import type {FeaturedCard} from "$lib/sanity.model";

    let {featured, locale}: { featured: FeaturedCard, locale: string } = $props();
</script>

<a class="shadow-md flex flex-col overflow-hidden rounded-md md:basis-1/3 md:hover:scale-110 transition-[scale]"
   href={`/${locale}/${featured.slug}`}>
    <img alt={featured.title} class="grow" src={featured.image}/>
    <div class="text-sm min-h-8 bg-gray-300 px-1 md:px-2 lg:px-4 font-bold flex flex-col justify-center">
        {featured.title}
    </div>
</a>