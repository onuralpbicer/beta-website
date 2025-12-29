<script lang="ts">
    import type {GetFooterQueryResult} from "$lib/sanity.types";

    let {footer, locale}: {
        locale: string,
        footer: GetFooterQueryResult
    } = $props();

    const year = new Date().getFullYear();
</script>

<footer class="bg-primary mt-4 text-primary-foreground pt-4 md:pt-8">
    <section
            class="mx-auto w-full md:max-w-[70vw] px-4 md:px-0 flex justify-around lg:justify-center lg:gap-16 flex-wrap">
        {#each footer?.footerColumns as column}
            <div class="flex flex-col">
                <h5 class="heading-5">
                    {column.title}
                </h5>
                {#each column.links as link}
                    <a href='/{locale}/{link.slug}'>{link.title}</a>
                {/each}
            </div>
        {/each}
    </section>
    <div class="text-center mt-8 md:mt-12 text-sm mb-1">
        <a href='/{locale}'>
            {footer?.copyright} &#169; {year}
        </a>
    </div>
</footer>