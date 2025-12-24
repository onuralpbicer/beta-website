<script lang="ts">

    import type {IHomePageEntry} from "$lib/contentful";
    import {Button} from "$lib/components/ui/button/index.js";

    let {home, locale}: { home: IHomePageEntry, locale: string } = $props();

    const heroImage = $derived(() => home.fields.heroImage!)
    const heroImageUrl = $derived(() => heroImage().fields.file!.url)

    const heroLink = $derived(() => home.fields.linkTo!.fields.slug)
</script>
<section
        class="flex flex-col items-start justify-center relative h-[40dvh] md:h-[50dvh] after:absolute after:inset-0 after:block after:bg-primary after:opacity-50 after:z-[-1] text-primary-foreground">
    <img alt={heroImage().fields.title} class="z-[-1] absolute inset-0 h-full w-full object-cover"
         src={heroImageUrl()}/>
    <div class="mx-auto w-full md:max-w-[70vw] px-8">
        <h1 class="heading-1">{home.fields.heroTitle}</h1>
        <p class="mt-4">{home.fields.heroDescription}</p>

        <a href={`/${locale}/${heroLink()}`}>
            <Button class="mt-8" variant="secondary">
                {home.fields.linkText}
            </Button>
        </a>
    </div>
</section>
