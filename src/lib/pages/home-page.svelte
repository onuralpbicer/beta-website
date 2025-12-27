<script lang="ts">

    import {Button} from "$lib/components/ui/button/index.js";
    import type {IHomePage} from "$lib/sanity.model";

    let {home, locale}: { home: IHomePage, locale: string } = $props();

    const heroImageUrl = $derived(() => home.page.heroImage.asset!.url)

    const heroLink = $derived(() => home.page.linkTo!.slug)
</script>
<section
        class="flex flex-col items-start justify-center relative h-[40dvh] md:h-[50dvh] after:absolute after:inset-0 after:block after:bg-primary after:opacity-50 after:z-[-1] text-primary-foreground">
    <img aria-hidden="true" alt="Hero" class="z-[-1] absolute inset-0 h-full w-full object-cover"
         src={heroImageUrl()}/>
    <div class="mx-auto w-full md:max-w-[70vw] px-8">
        <h1 class="heading-1">{home.page.heroTitle}</h1>
        <p class="mt-4">{home.page.heroDescription}</p>

        <a href={`/${locale}/${heroLink()}`}>
            <Button class="mt-8" variant="secondary">
                {home.page.linkText}
            </Button>
        </a>
    </div>
</section>
