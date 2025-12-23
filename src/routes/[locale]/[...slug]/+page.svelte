<script lang="ts">
    import type {PageProps} from './$types';

    let {data, params}: PageProps = $props();

</script>

{#if data.entry}
    <div>{data.entry.sys.id}</div>
    <div>{data.entry.sys.contentType.sys.id}</div>
    <div>{JSON.stringify(data.entry.fields)}</div>
{/if}