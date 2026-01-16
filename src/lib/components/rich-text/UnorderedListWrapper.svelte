<script lang="ts">
    import type {ListComponentProps} from '@portabletext/svelte'
    import type {Snippet} from "svelte";

    interface Props {
        portableText: ListComponentProps
        children: Snippet
    }

    let {portableText, children}: Props = $props()

    console.log(portableText)
</script>

<ul class="list-disc">
    {@render children()}
</ul>
