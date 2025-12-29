<script lang="ts">

    import './layout.css';
    import favicon from '$lib/assets/favicon.ico';
    import {dev} from '$app/environment';


    let {children} = $props();
</script>

<svelte:head>
    <link href={favicon} rel="icon"/>
    {#if (dev)}
        <meta name="robots" content="noindex, nofollow">
    {/if}
</svelte:head>
{@render children()}
