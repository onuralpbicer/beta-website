<script lang="ts">
    import type {AlternateTranslation, IHeaderInfo} from '$lib/model';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import {Menu} from '@lucide/svelte'

    let {headerInfo: header, locale, translations}: {
        headerInfo: IHeaderInfo,
        locale: string,
        translations: AlternateTranslation[]
    } = $props();

    const translation = $derived(() => translations.find((l) => l.code !== locale)!)
</script>

<header class="h-16 md:h-18 p-4 flex items-center border-primary-500 border-b">
    <a href={`/${locale}`}>
        <img alt="logo" class="max-h-16 md:max-h-18" src="{header.logo}"/>
    </a>

    <nav aria-label="Header tabs" class="hidden md:block ml-2">
        {#each header.headerLinks as link}
            <a href={`/${locale}/${link.slug}`} class="ml-2">{link.title}</a>
        {/each}
    </nav>

    <div aria-hidden="true" class="flex-1"></div>


    <a class="mr-4 flex items-center gap-1" href={`/${translation().code}/${translation().href}`}>
        <img alt={`${translation().name} Language Page`} src={`/flags/${translation().code}.svg`} width="24"/>
        {translation().name}
    </a>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button class="md:hidden" variant="outline">
                <Menu/>
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-56">
            {#each header.headerLinks as link}
                <DropdownMenu.Item>
                    <a href={`/${locale}/${link.slug}`} class="ml-2">{link.title}</a>
                </DropdownMenu.Item>
            {/each}
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</header>
