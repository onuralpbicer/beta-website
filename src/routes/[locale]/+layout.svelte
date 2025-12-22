<script lang="ts">
    import type {LayoutProps} from './$types';
    import Header from '$lib/header.svelte'

    let {data, children, params}: LayoutProps = $props();

</script>

<Header headerInfo={data.header} locale={params.locale}/>
<main>{@render children()}</main>
<footer>footer</footer>