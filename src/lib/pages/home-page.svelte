<script lang="ts">

    import {Button} from "$lib/components/ui/button/index.js";
    import type {IHomePage} from "$lib/sanity.model";
    import FeaturedCard from "$lib/components/featured-card.svelte";
    import WhyUsCard from "$lib/components/why-us-card.svelte";

    let {home, locale}: { home: IHomePage, locale: string } = $props();

    const heroImageUrl = $derived(() => home.page.heroImage.asset!.url)

    const heroLink = $derived(() => home.page.linkTo!.slug)
</script>
<section
        class="flex flex-col items-start justify-center relative h-[40dvh] md:h-[50dvh] after:absolute after:inset-0 after:block after:bg-primary after:opacity-50 after:z-[-1] text-primary-foreground">
    <img alt="Hero" aria-hidden="true" class="z-[-1] absolute inset-0 h-full w-full object-cover"
         src={heroImageUrl()}/>
    <div class="mx-auto w-full md:max-w-[70vw] px-8">
        <h1 class="heading-1">{home.page.heroTitle}</h1>
        <p class="mt-4">{home.page.heroDescription}</p>

        <a href='/{locale}/{heroLink()}'>
            <Button class="mt-8" variant="secondary">
                {home.page.linkText}
            </Button>
        </a>
    </div>
</section>
<section>
    <div class="mx-2 flex items-center justify-center gap-2 md:gap-4 mt-4 flex-wrap">
        {#each home.page.keywords as keyword}
            <span class="shadow-md border-gray-400 border px-2 rounded-md text-nowrap">{keyword}</span>
        {/each}
    </div>
</section>
<section class="mx-auto w-full md:max-w-[70vw] px-4 md:px-0 mb-4">
    <h2 class="heading-2 my-4">{home.page.featuredTitle}</h2>
    <div class="mx-2 md:mx-4 lg:mx-8 flex items-stretch justify-center gap-4 flex-wrap md:flex-nowrap">
        {#each home.page.featured as featured}
            <FeaturedCard featured={featured} locale={locale}/>
        {/each}
    </div>
    <h2 class="heading-2 my-4">{home.page.whyUsTitle}</h2>
    <div class="mx-2 md:mx-4 lg:mx-8 flex items-stretch justify-center gap-4 flex-wrap md:flex-nowrap">
        {#each home.page.whyUs as whyUs}
            <WhyUsCard whyUs={whyUs}/>
        {/each}
    </div>
</section>
