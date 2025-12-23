<script lang="ts">

    import type {IHomePageEntry} from "$lib/contentful";
    import {Button} from "$lib/components/ui/button/index.js";

    let {home}: { home: IHomePageEntry } = $props();

    const heroImage = $derived(() => home.fields.heroImage!)
    const heroImageUrl = $derived(() => heroImage().fields.file!.url)
</script>
<section
        class="flex flex-col items-start justify-center relative h-[40dvh] md:h-[50dvh] after:absolute after:inset-0 after:block after:bg-primary after:opacity-50 after:z-[-1] text-primary-foreground">
    <img alt={heroImage().fields.title} class="z-[-1] absolute inset-0 h-full w-full object-cover"
         src={heroImageUrl()}/>
    <div class="mx-auto w-full md:max-w-[70vw] px-8">
        <h1 class="heading-1">{home.fields.heroTitle}</h1>
        <p class="mt-4">{home.fields.heroDescription}</p>

        <!--        <a href={home.fields.} />-->
        <Button class="mt-8" variant="secondary">
            <!-- todo functionality of the link -->
            {home.fields.linkText}
        </Button>
    </div>
</section>
