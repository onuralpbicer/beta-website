<script lang="ts">

    import type {IRichTextPageEntry} from "$lib/contentful";
    import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

    let {richText}: { richText: IRichTextPageEntry } = $props();

    const html = $derived(() => documentToHtmlString(richText.fields.content))
</script>

<section class="mx-auto w-full md:max-w-[70vw] md:min-w-175 px-8 my-8 min-h-[60dvh]">
    <h1 class="heading-1 mb-8">{richText.fields.title}</h1>

    {@html html()}
</section>
