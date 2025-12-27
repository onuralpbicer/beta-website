<script lang="ts">

    import type {IRichTextPage} from "$lib/sanity.model";
    import {PortableText} from '@portabletext/svelte'

    let {richText}: { richText: IRichTextPage } = $props();

</script>

<section class="mx-auto w-full md:max-w-[70vw] md:min-w-175 px-8 my-8 min-h-[60dvh]">
    <h1 class="heading-1 mb-8">{richText.title}</h1>

    <PortableText value={richText.page.content ?? []} />
</section>
