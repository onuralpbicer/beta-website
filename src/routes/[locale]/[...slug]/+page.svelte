<script lang="ts">
    import type {PageProps} from './$types';

    let {data, params}: PageProps = $props();

</script>


<div>{data.sys.id}</div>
<div>{data.sys.contentType.sys.id}</div>
<div>{JSON.stringify(data.fields)}</div>